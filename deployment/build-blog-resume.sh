set -xe
cd ./diary/.app
npm run build 
cd ../../resume
NODE_OPTIONS=--openssl-legacy-provider npm run build 
cd ../
cd ./diary/.app/dist
mkdir resume
pwd
cp -r ./../../../resume/dist/. resume
# http-server -p 3020  -c-1  .

# NEXT_PUBLIC_DIARY_URL=http://localhost:3020 npm run dev