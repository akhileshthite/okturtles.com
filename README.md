# okturtles.com

This project uses [nginx SSI](http://nginx.org/en/docs/http/ngx_http_ssi_module.html)
to include header and footer files. For local testing it uses the
[node-ssi](https://github.com/yanni4night/node-ssi) module.

To test locally:

1. Make sure CoffeeScript is installed

        npm install -g coffee-script

2. Install dependencies

        npm install

Then run the server using:

    coffee server.coffee

And visit: [http://localhost:8080](http://localhost:8080)

## Development

Run `npm run dev` command.

To compile scss files in `includes/sass` folder, run `npm run compile-sass`

## TODO

- Use a Gruntfile instead of this `coffee` and `npm run compile-sass` stuff.
