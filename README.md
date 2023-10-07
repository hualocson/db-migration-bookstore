# Migration tools for bookstore

1. Create new migration
```bash
npx ley new migration_file_name --length 3 --esm
```
2. Drop all migrations
```bash
yarn run migrate down --all
```
3. Update migrations
```bash
yarn run migrate up
```