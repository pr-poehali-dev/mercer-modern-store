import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает все заказы и клиентов для админ-панели."""

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p73953232_mercer_modern_store')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute(
        f"SELECT id, name, email, phone, city, address, comment, items, total, status, created_at "
        f"FROM {schema}.orders ORDER BY created_at DESC LIMIT 100"
    )
    orders_rows = cur.fetchall()
    orders = [
        {
            'id': str(r[0]),
            'name': r[1],
            'email': r[2],
            'phone': r[3],
            'city': r[4],
            'address': r[5],
            'comment': r[6] or '',
            'items': r[7] if isinstance(r[7], list) else [],
            'total': r[8],
            'status': r[9],
            'created_at': r[10].isoformat() if r[10] else '',
        }
        for r in orders_rows
    ]

    cur.execute(
        f"SELECT id, email, name, orders_count, is_banned, created_at "
        f"FROM {schema}.users ORDER BY created_at DESC LIMIT 100"
    )
    users_rows = cur.fetchall()
    users = [
        {
            'id': str(r[0]),
            'email': r[1],
            'name': r[2],
            'orders_count': r[3],
            'is_banned': r[4],
            'created_at': r[5].isoformat() if r[5] else '',
        }
        for r in users_rows
    ]

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'orders': orders, 'users': users})
    }
