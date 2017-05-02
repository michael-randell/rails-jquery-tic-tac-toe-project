class Game < ActiveRecord::Base
  serialize :state, Array
end
