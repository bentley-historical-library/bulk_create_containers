ArchivesSpace::Application.routes.draw do

  [AppConfig[:frontend_proxy_prefix], AppConfig[:frontend_prefix]].uniq.each do |prefix|

    scope prefix do
      match('/plugins/bulk_create_containers/create' => 'bulk_create_containers#create', :via => [:get])
    end
  end
end