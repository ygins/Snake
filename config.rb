require 'compass/import-once/activate'
require 'sass'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "scripts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
module Sass::Script::Functions
  def myRand(max = Sass::Script::Number.new(100))
    Sass::Script::Number.new(rand(max.value), max.numerator_units, max.denominator_units)
  end

  def squareDiameter()
    require 'json'
    data=JSON.parse(open("options.json").read);
    Sass::Script::Number.new(data['square-diameter']);
  end
end
