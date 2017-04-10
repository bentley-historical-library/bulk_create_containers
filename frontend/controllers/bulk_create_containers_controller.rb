class BulkCreateContainersController < ApplicationController
  set_access_control "update_container_record" => [:create]

  def index
  end

  def create
    record = JSONModel(params[:record_type]).find_by_uri(params[:record_uri])
    post_uri = "#{JSONModel::HTTP.backend_url}/repositories/#{session[:repo_id]}/top_containers"
    container_start = params[:container_start].to_i
    container_end = params[:container_end].to_i
    instance_type = params[:instance_type]
    container_type = params[:container_type]

    new_instances = []
    (container_start..container_end).each do |indicator|
      top_container = {:indicator => indicator.to_s, :type => container_type, :jsonmodel_type => "top_container"}
      response = JSONModel::HTTP::post_json(URI(post_uri), top_container.to_json)
      result = ASUtils.json_parse(response.body)
      instance = {:instance_type => instance_type, :sub_container => {:top_container => {:ref => result["uri"] }}}
      new_instances << instance
    end

    record.instances.concat(new_instances.flatten)
    record.save

    flash[:success] = I18n.t("plugins.bulk_create_containers.messages.success")
    redirect_to :controller => :accessions, :action => :edit, :id => record.id
  end 
end