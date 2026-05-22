import json
import os
import smtplib
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event: dict, context) -> dict:
    """Принимает заказ, сохраняет в БД и отправляет уведомление на почту администратора."""

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '')
    email = body.get('email', '')
    phone = body.get('phone', '')
    city = body.get('city', '')
    address = body.get('address', '')
    comment = body.get('comment', '')
    items = body.get('items', [])
    total = body.get('total', 0)

    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p73953232_mercer_modern_store')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute(
        f"INSERT INTO {schema}.orders (name, email, phone, city, address, comment, items, total) "
        f"VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id, created_at",
        (name, email, phone, city, address, comment, json.dumps(items), total)
    )
    row = cur.fetchone()
    order_id = str(row[0])
    created_at = row[1]

    cur.execute(
        f"INSERT INTO {schema}.users (email, name, orders_count) VALUES (%s, %s, 1) "
        f"ON CONFLICT (email) DO UPDATE SET orders_count = {schema}.users.orders_count + 1, name = EXCLUDED.name",
        (email, name)
    )

    conn.commit()
    cur.close()
    conn.close()

    smtp_pass = os.environ.get('SMTP_PASSWORD', '')
    if smtp_pass:
        items_html = ''.join([
            f"<tr><td style='padding:6px 12px;border-bottom:1px solid #eee;'>{i.get('name')}</td>"
            f"<td style='padding:6px 12px;border-bottom:1px solid #eee;'>{i.get('color')}, {i.get('size')}</td>"
            f"<td style='padding:6px 12px;border-bottom:1px solid #eee;'>{i.get('quantity')} шт.</td>"
            f"<td style='padding:6px 12px;border-bottom:1px solid #eee;text-align:right;'>{i.get('price', 0) * i.get('quantity', 1):,} ₽</td></tr>"
            for i in items
        ])

        html = f"""
        <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0d0d0d;">
          <div style="border-bottom: 2px solid #0d0d0d; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 28px; letter-spacing: 0.2em; font-weight: 300; margin: 0;">MERCER</h1>
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; margin: 4px 0 0;">Новый заказ #{order_id[:8].upper()}</p>
          </div>

          <table style="width:100%; border-collapse:collapse; margin-bottom: 24px;">
            <tr><td style="padding:4px 0; color:#888; font-size:12px; width:120px;">Клиент</td><td style="font-size:14px;">{name}</td></tr>
            <tr><td style="padding:4px 0; color:#888; font-size:12px;">Email</td><td style="font-size:14px;">{email}</td></tr>
            <tr><td style="padding:4px 0; color:#888; font-size:12px;">Телефон</td><td style="font-size:14px;">{phone}</td></tr>
            <tr><td style="padding:4px 0; color:#888; font-size:12px;">Город</td><td style="font-size:14px;">{city}</td></tr>
            <tr><td style="padding:4px 0; color:#888; font-size:12px;">Адрес</td><td style="font-size:14px;">{address}</td></tr>
            {"<tr><td style='padding:4px 0; color:#888; font-size:12px;'>Комментарий</td><td style='font-size:14px;font-style:italic;'>" + comment + "</td></tr>" if comment else ""}
          </table>

          <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
            <thead>
              <tr style="background:#0d0d0d; color:#fff;">
                <th style="padding:10px 12px; text-align:left; font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase;">Товар</th>
                <th style="padding:10px 12px; text-align:left; font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase;">Параметры</th>
                <th style="padding:10px 12px; text-align:left; font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase;">Кол-во</th>
                <th style="padding:10px 12px; text-align:right; font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase;">Сумма</th>
              </tr>
            </thead>
            <tbody>{items_html}</tbody>
          </table>

          <div style="border-top: 2px solid #0d0d0d; padding-top: 16px; text-align: right;">
            <p style="font-size:18px; font-weight:500; margin:0;">Итого: {total:,} ₽</p>
          </div>

          <p style="margin-top:32px; font-size:11px; color:#aaa; letter-spacing:0.1em;">
            {datetime.now().strftime('%d.%m.%Y %H:%M')} · MERCER Admin
          </p>
        </div>
        """

        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'MERCER — Новый заказ от {name} на {total:,} ₽'
        msg['From'] = 'yonqwery@gmail.com'
        msg['To'] = 'yonqwery@gmail.com'
        msg.attach(MIMEText(html, 'html'))

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login('yonqwery@gmail.com', smtp_pass)
            server.sendmail('yonqwery@gmail.com', 'yonqwery@gmail.com', msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'order_id': order_id})
    }
