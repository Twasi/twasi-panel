# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:10.15.3

ARG VERSION
ENV VERSION=$VERSION

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL all

# Copy all local files into the image.
COPY . .

# Install dependencies
RUN yarn

# Build for production.
RUN yarn run build --production

# Install `serve` to run the application.
RUN yarn global add serve

# Set the command to start the node server.
CMD bash scripts/start.sh

# Tell Docker about the port we'll run on.
EXPOSE 5000
