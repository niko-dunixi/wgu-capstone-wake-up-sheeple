.PHONY: deploy start fix-permissions clean update

export AWS_PROFILE = paul-freakn-baker
export AWS_REGION = us-west-2

# 	--memory=4gb \
# --network host
# -p 3000:3000
NODE := docker run --rm -it \
	-w /workdir -v $(PWD):/workdir \
	--network host \
	--user $(shell id -u):$(shell id -g) \
	node:10.23.0-alpine

node_modules:
	$(NODE) npm install

build: node_modules
	$(NODE) npm run build

deploy: build
	aws s3 sync ./build/ s3://main-wgu-capstone-corpus-wakeupsheeplewebsitebuck-qq700grvjn8l
	aws cloudfront create-invalidation --distribution-id E3N3UDUW1AS08R --paths "/*"

start: node_modules
	$(NODE) npm run start

fix-permissions:
	sudo chown -R ${USER}:${USER} .

clean:
	[ ! -d build ] || rm -rfv build
	[ ! -d node_modules ] || rm -rfv node_modules

update: clean
	[ ! -f package-lock.json ] || rm -fv package-lock.json
	$(NODE) npm update --save-dev
