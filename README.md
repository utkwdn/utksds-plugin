# Repository for Gutenberg/Bootstrap Toolkit

Dependencies (choose one):

1. MySQL, PHP 7.x, Apache or Nginx
2. Docker and Docker Compose

- To instantiate a docker container, run `docker-compose up -d`
- `chown -R user:user *` to edit, but it may be necessary to set this to `http` in order to run updates once the site is configured

Plugin files can be obtained from `wp-content/plugins`

## Post clone
Run npm install in plugins/utds

Run `npm start` in plugin root to automatically compile changes.
