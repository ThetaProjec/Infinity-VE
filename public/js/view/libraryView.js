define(['jquery', 'backbone', 'view/assetListView'],

    function ($, Backbone, AssetView) {

        return Backbone.View.extend({

            initialize : function () {

                _.bindAll(this, 'render', 'renderAssetView', 'removeAssetView');

                this.collection.on('analyzed', this.renderAssetView);
                this.collection.on('add', this.renderAssetView);
                this.collection.on('change', this.renderAssetView);
                this.collection.on('remove', this.removeAssetView);
            },

            events : {
                'click div.asset' : 'assetClickHandler'
            },

            assetClickHandler : function (e) {
                var asset = this.collection.get(e.currentTarget.id);
                if (asset.hasCompatibleMedia()) {
                    app.controller.currentAsset = asset;
                }
            },

            comparator : function (asset) {
                //return asset.get('name');
            },

            renderAssetView : function (asset) {

                //without an id the asset shouldn't be rendered
                if(!asset.id) return;

                //progress-update does not need a whole rendering
                if (_.isObject(asset.changedAttributes())) {
                    var keys = _.keys(asset.changedAttributes());
                    if (keys.length === 1 && keys[0] == 'progress') return;
                }

                console.log('LIBRARYVIEW.JS::RENDERING ASSETVIEW');

                var assetView = new AssetView({model : asset, el : this.$el}),
                    $assetEl = this.$el.find('#' + asset.id);

                //hasn't been rendered before
                if (_.isEmpty($assetEl[0])) {
                    //strange bug in firefox that produces duplicates
                    $($assetEl[0]).remove();
                    this.$el.append(assetView.render());
                }
                //needs update
                else {
                    $assetEl.replaceWith(assetView.render());
                }

            },

            removeAssetView : function (asset) {
                this.$el.find('#' + asset.id).remove();
            },

            render : function () {

                if (!this.collection) return null;

                console.log('LIBRARYVIEW.JS::RENDERING');

                this.$el.empty();

                _.each(this.collection.models, function (asset) {
                    this.renderAssetView(asset);
                }, this);

                return this.$el.html();
            }
        });


    })
;