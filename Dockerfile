# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:9.3.0

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL all

# Copy all local files into the image.
COPY . .

# Move the default config file (could be adapted later or replaced using volumes)
RUN mv public/config/config.beta.js public/config/config.js

# Install dependencies
RUN yarn

# Build for production.
RUN yarn run build --production

# Install `serve` to run the application.
RUN yarn global add serve

# Set the command to start the node server.
CMD serve -s build

# Tell Docker about the port we'll run on.
EXPOSE 5000
