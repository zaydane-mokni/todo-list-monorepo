serve-all: stop-mongo start-mongo serve

serve:
	npm run start

start-mongo:
	docker run -d --name todo-list-app  -p 27017:27017 mongo

stop-mongo:
	docker rm -f todo-list-app || true
	docker container stop todo-list-app || echo "no mongo container to stop"

lint:
	npm run lint

test-unit:
	npm run test

test-unit-watch:
	npm run test:watch
