node ../../../js-doc-parse/parse.js config=api-config.js
node ../module/apiDetailsWriter.js
node ../module/apiStoreWriter.js
rm details.json
rm tree.json
