
# # Valid request
curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "yoni", "species": "white_rhinoceros"}' \
    http://localhost:3000/rhinoceros


# Non valid request
curl -X POST -H "Content-Type: application/json" \
    -d '{"king": "yoni", "species": "white_rhinoceros"}' \
    http://localhost:3000/rhinoceros

curl -X POST -H "Content-Type: application/json" \
    -d '{"king": "yoni", "species": "white_rhinoceros", "test": "Wont work"}' \
    http://localhost:3000/rhinoceros


# /rhinoceros/:id

curl http://localhost:3000/rhinoceros/70314997-b314-4a30-b5bc-1ed9fbd030c8