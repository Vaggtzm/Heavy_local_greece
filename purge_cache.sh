#!/bin/bash

export $(cat .env | xargs)

curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     --data '{"purge_everything":true}'