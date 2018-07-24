token-request:
	curl -X GET "http://localhost:3000/api/token?email=kyledevinobrien1@gmail.com&password=clipper"

token-request-bad:
	curl -X GET "http://localhost:3000/api/token?email=kyledevinobrien1@gmail.com&password=kuma"

new-user-request:
	curl -X POST -H '"content-type": "application/json"' -d '{"email": "kyle@remot3.it", "password": "root"' http://localhost:3000/api/users