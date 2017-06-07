class GamesController < ApplicationController
  def index
    @games = Game.all
    ordered_games = @games.order(:created_at)
    #binding.pry
    #games_json_serializer = ActiveModel::ArraySerializer.new(@games, each_serializer: GameSerializer).as_json #THIS WORKS TOO
    with_games_key = {"games" => ordered_games.as_json(only: [:id, :state])}
    render json: with_games_key
  end

  def create
    @game = Game.create(game_params)
    #binding.pry
    #render json: @game
    with_games_key = {"game" => @game.as_json(only: [:id, :state])}
    render json: with_games_key
  end

  def update
    @game = Game.find(params[:id])
    @game.update(game_params)
    with_games_key = {"game" => @game.as_json(only: [:id, :state])}
    render json: with_games_key
    #render json: @game
  end

  private
  def game_params
    params.require(:game).permit(:state => [])
  end
end
