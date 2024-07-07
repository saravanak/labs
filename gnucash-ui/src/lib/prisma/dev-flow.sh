

# Since we use zenstack (self: why still?) we need to follow this custom reset flow.

export $(cat ./.env.local | xargs)
prisma migrate reset --skip-generate --skip-seed 
npx zenstack generate
yarn db:push
yarn db:seed