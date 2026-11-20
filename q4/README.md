# Q4 - Troubleshoot & Explain

## Kode yang salah

```js
function getTotalUsageMB(records) {
    return records.reduce((total, record) => {
        total += record.dataUsageMB;
    });
}
```

## Penyebab

Ada 2 kesalahan:
1. **Tidak ada `return` didalam callback.**
    `reduce` memakai nilai yang di-return callback sebagai `total` untuk loop berikutnya. Karena callback tidak me-return apa-apa, `total` menjadi `undefined`, dan hasil akhirnya juga `undefined`. `total += ...` hanya mengubah variabel lokal, bukan hasil `reduce`.
2. **Tidak ada nilai awal (initial value).**
    Tanpa nilai awal, `reduce` memakai elemen pertama sebagai `total`. Akibatnya:
    - array kosong menghasilkan error
    - array berisi 1 record mengembalikan record itu sendiri, bukan angka

## Perbaikan

```js
function getTotalUsageMB(records) {
    return records.recude((total, record) => {
        const usage = record.dataUsageMB || 0;
        
        return total + usage;
    }, 0);
}
```

- Ditambahkan `return` supaya hasil penjumlahan sebagai `total` di loop berikutnya.
- Ditambahkan `0` sebagai default value.
- Fallback `|| 0` sebagai gate apabila record tidak punya `dataUsageMB` akan dihitung 0, bukan `NaN`.

## Cara cek

```bash
node --test q4/
```

| Kasus | Versi bug | Versi fix |
|---|---|---|
| 8 record dari Q3 | `undefined` | `29700` |
| 1 record (1500 MB) | object record | `1500` |
| Array kosong | `TypeError` | `0` |
| Record tanpa `dataUsageMB` | - | dihitung `0` |

## Cara mencegah

