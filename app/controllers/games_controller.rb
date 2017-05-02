class GamesController < ApplicationController
  def index
    @games = Game.all
    #games_json_serializer = ActiveModel::ArraySerializer.new(@games, each_serializer: GameSerializer).as_json #THIS WORKS TOO
    with_games_key = {"games" => @games.as_json(only: [:id, :state])}
    render json: with_games_key
  end

  def create
    @game = Game.create(game_params)
    #binding.pry
    render json: @game
  end

  def update
    @game = Game.find(params[:id])
    @game.update(game_params)
    render json: @game
  end

  private
  def game_params
    params.require(:game).permit(:state => [])
  end
end
