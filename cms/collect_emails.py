#!/usr/bin/env python3
"""
Скрипт для сбора email-адресов с сайтов из neti_kinnisvara_links.csv
Задача: обойти каждый сайт и извлечь все найденные email-адреса.

Установка: pip install requests
Запуск: python collect_emails.py
"""

import csv
import re
import time
import urllib.parse

try:
    import requests
except ImportError:
    print("Установите requests: pip install requests")
    exit(1)

# Конфигурация
INPUT_CSV = 'neti_kinnisvara_links.csv'
OUTPUT_CSV = 'neti_with_emails.csv'
DELAY_SEC = 2  # Пауза между запросами (избегаем блокировки)
TIMEOUT_SEC = 15
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

# Страницы для проверки, если на главной email не найден
CONTACT_PATHS = ['/kontakt', '/contact', '/kontaktid', '/about', '/meist', '/about-us']


def find_emails_in_text(text: str) -> set[str]:
    """Извлекает email-адреса из текста с помощью regex."""
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    found = re.findall(pattern, text)
    # Фильтруем мусор (расширения файлов, placeholder'ы)
    invalid_suffixes = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.woff', '.woff2')
    invalid_patterns = ('example.com', 'domain.com', 'email@example', 'xxx@', 'test@test')
    valid = set()
    for e in found:
        e_lower = e.lower()
        if e_lower.endswith(invalid_suffixes):
            continue
        if any(p in e_lower for p in invalid_patterns):
            continue
        if len(e) > 5 and '@' in e:
            valid.add(e)
    return valid


def fetch_url(url: str) -> str | None:
    """Загружает HTML страницы по URL."""
    try:
        r = requests.get(url, timeout=TIMEOUT_SEC, headers={'User-Agent': USER_AGENT})
        r.raise_for_status()
        r.encoding = r.apparent_encoding or 'utf-8'
        return r.text
    except Exception as ex:
        print(f"  Ошибка: {ex}")
        return None


def get_base_url(url: str) -> str:
    """Возвращает базовый URL (схема + хост)."""
    parsed = urllib.parse.urlparse(url)
    return f"{parsed.scheme}://{parsed.netloc}"


def collect_emails_from_site(name: str, url: str) -> tuple[str, str]:
    """
    Собирает email с главной страницы и при необходимости со страниц контактов.
    Возвращает (emails_str, status).
    """
    emails: set[str] = set()
    base = get_base_url(url)

    # 1. Главная страница
    html = fetch_url(url)
    if html:
        emails |= find_emails_in_text(html)

    # 2. Если на главной нет — пробуем страницы контактов
    if not emails:
        for path in CONTACT_PATHS:
            contact_url = base.rstrip('/') + path
            html = fetch_url(contact_url)
            if html:
                found = find_emails_in_text(html)
                if found:
                    emails |= found
                    break
            time.sleep(1)  # Короткая пауза между подстраницами

    result = "; ".join(sorted(emails)) if emails else "Не найдено"
    status = "OK" if emails else "Не найдено"
    return result, status


def main():
    print("Загрузка CSV...")
    rows = []
    with open(INPUT_CSV, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f, delimiter=';')
        fieldnames = reader.fieldnames or ['Name', 'URL']
        for row in reader:
            # Убираем кавычки из значений
            clean = {k: v.strip('"').strip() for k, v in row.items() if k}
            if clean.get('URL'):
                rows.append(clean)

    print(f"Найдено {len(rows)} записей. Начинаю сбор email...\n")

    results = []
    for i, row in enumerate(rows, 1):
        name = row.get('Name', '')
        url = row.get('URL', '').strip()
        if not url:
            continue
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url

        print(f"[{i}/{len(rows)}] {name}: {url}")
        emails_str, status = collect_emails_from_site(name, url)
        print(f"  -> {emails_str}")

        results.append({
            'Name': name,
            'URL': url,
            'Emails': emails_str,
            'Status': status,
        })

        if i < len(rows):
            time.sleep(DELAY_SEC)

    # Сохранение результата
    out_path = OUTPUT_CSV
    with open(out_path, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['Name', 'URL', 'Emails', 'Status'], delimiter=';')
        writer.writeheader()
        writer.writerows(results)

    found_count = sum(1 for r in results if r['Emails'] != 'Не найдено')
    print(f"\nГотово! Результаты сохранены в {out_path}")
    print(f"Email найдено на {found_count} из {len(results)} сайтов.")


if __name__ == '__main__':
    main()
