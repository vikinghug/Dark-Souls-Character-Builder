require "bundler/capistrano"

set :application, "darksouls"
set :repository,  "git@github.com:itsthatguy/Dark-Souls-Character-Builder.git"
set :deploy_to, defer {"/home/itsthatg/apps/#{application}"}

set :scm, :git

role :web, "itsthatguy.com"
role :app, "itsthatguy.com"
role :db,  "itsthatguy.com", :primary => true
set :user, "itsthatg"

default_run_options[:pty] = true
set :ssh_options, { :paranoid => false }
set :use_sudo, false

after "deploy",             "git:tag_last_deploy"
after "deploy:migrations",  "git:tag_last_deploy"
after "deploy:cold",        "git:tag_last_deploy"
after "deploy:update_code", "configs:symlink"
after "deploy:update",      "deploy:migrate"

namespace :deploy do
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

namespace :configs do
  task :symlink, :roles => :app do
    run "ln -nfs #{shared_path}/config/database.yml #{latest_release}/config/database.yml"
    run "ln -nfs #{shared_path}/public/.htaccess    #{latest_release}/public/.htaccess"
  end
end

def object_to_commit(object)
  # Translates any number of git object references to the commit it references
  # works for "", HEAD, branch names, tags that reference a commit, tags that reference a tag,
  # dessert toppings, floor waxes, &c.
  `git log -n 1 --format=%H #{object}`.strip
end

namespace :git do
  task :tag_last_deploy do
    timestamp_string_without_seconds = Time.now.strftime("%Y%m%d%H%M")
    set :tag_name, "deployed_to_#{rails_env}_#{timestamp_string_without_seconds}"
    `git tag -a -m "Tagging deploy to #{rails_env} at #{timestamp_string_without_seconds}. #{ENV['TAGMSG']}" #{tag_name} #{object_to_commit(latest_revision)}`
    `git push --tags > /dev/null 2>&1 &` # git push in background so it doesn't slow down deploys
    puts "Tagged release with #{tag_name}, pushing tags in the background."
  end
end
