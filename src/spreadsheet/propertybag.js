(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;

    var Property = kendo.Class.extend({
        init: function(list) {
            this.list = list;
        },

        get: function(index) {
            return this.parse(this.list.value(index, index));
        },

        set: function(start, end, value) {
            if (value === undefined) {
                value = end;
                end = start;
            }

            this.list.value(start, end, value);
        },

        parse: function(value) {
            return value;
        },

        copy: function(start, end, dst) {
            this.list.copy(start, end, dst);
        },

        iterator: function(start, end) {
            return this.list.iterator(start, end);
        }
    });

    var JsonProperty = Property.extend({
        set: function(start, end, value) {
            this.list.value(start, end, JSON.stringify(value));
        },

        parse: function(value) {
            return JSON.parse(value);
        }
    });

    var ValueProperty = Property.extend({
        init: function(values, formats) {
            Property.prototype.init.call(this, values);
            this.formats = formats;
        },

        set: function(start, end, value) {
            if (value instanceof Date) {
                // XXX: should we check if existing format is not
                // already date, in which case not reset it?
                value = kendo.spreadsheet.dateToNumber(value);
                this.formats.value(start, end, toExcelFormat(kendo.culture().calendar.patterns.d));
            }

            this.list.value(start, end, value);
        }
    });

    function toExcelFormat(format) {
        return format.replace(/M/g, "m").replace(/'/g, '"').replace(/tt/, "am/pm");
    }

    kendo.spreadsheet.PropertyBag = kendo.Class.extend({
        specs: [
            { property: Property, name: "format", value: null, sortable: true, serializable: true },
            { property: ValueProperty, name: "value", value: null, sortable: true, serializable: true, depends: "format" },
            { property: Property, name: "formula", value: null, sortable: true, serializable: true },
            { property: Property, name: "background", value: null, sortable: true, serializable: true },
            { property: JsonProperty, name: "vBorders", value: null, sortable: false, serializable: false },
            { property: JsonProperty, name: "hBorders", value: null, sortable: false, serializable: false },
            { property: Property, name: "color", value: null, sortable: true, serializable: true },
            { property: Property, name: "fontFamily", value: null, sortable: true, serializable: true },
            { property: Property, name: "underline", value: null, sortable: true, serializable: true },
            { property: Property, name: "fontSize", value: null, sortable: true, serializable: true },
            { property: Property, name: "italic", value: null, sortable: true, serializable: true },
            { property: Property, name: "bold", value: null, sortable: true, serializable: true },
            { property: Property, name: "textAlign", value: null, sortable: true, serializable: true },
            { property: Property, name: "verticalAlign", value: null, sortable: true, serializable: true },
            { property: Property, name: "wrap", value: null, sortable: true, serializable: true },
            { property: Property, name: "validation", value: null, sortable: false, serializable: true },
            { property: Property, name: "enable", value: null, sortable: false, serializable: true },
            { property: Property, name: "link", value: null, sortable: false, serializable: true },
            { property: Property, name: "editor", value: null, sortable: false, serializable: true }
        ],

        init: function(rowCount, columnCount, defaultValues) {
            defaultValues = defaultValues || {};

            this.rowCount = rowCount;
            this.columnCount = columnCount;
            this.properties = {};
            this.lists = {};

            this.specs.forEach(function(spec) {
                var cellCount = rowCount * columnCount - 1;
                var name = spec.name;
                var value = defaultValues[name];
                if (value === undefined) {
                    value = spec.value;
                }
                if (name == "hBorders") {
                    cellCount += columnCount;
                } else if (name == "vBorders") {
                    cellCount += rowCount;
                }
                this.lists[name] = new kendo.spreadsheet.SparseRangeList(0, cellCount, value);
                this.properties[name] = new spec.property(this.lists[name], this.lists[spec.depends]);
            }, this);
        },

        getState: function() {
            var state = {};

            this.specs.forEach(function(spec) {
               state[spec.name] = this.lists[spec.name].getState();
            }, this);

            return state;
        },

        setState: function(state) {
            this.specs.forEach(function(spec) {
                this.lists[spec.name].setState(state[spec.name]);
            }, this);
        },

        get: function(name, index) {
            if (index === undefined) {
                return this.lists[name];
            }

            switch (name) {
              case "borderRight":
                index += this.rowCount;
                /* falls through */
              case "borderLeft":
                name = "vBorders";
                break;

              case "borderBottom":
                index++;
                /* falls through */
              case "borderTop":
                name = "hBorders";
                break;
            }
            return this.properties[name].get(index);
        },

        set: function(name, start, end, value) {
            switch (name) {
              case "borderRight":
                start += this.rowCount;
                end += this.rowCount;
                /* falls through */
              case "borderLeft":
                name = "vBorders";
                break;

              case "borderBottom":
                start++;
                end++;
                /* falls through */
              case "borderTop":
                name = "hBorders";
                break;
            }
            this.properties[name].set(start, end, value);
        },

        fromJSON: function(index, value) {
            for (var si = 0; si < this.specs.length; si++) {
                var spec = this.specs[si];

                if (spec.serializable) {
                    if (value[spec.name] !== undefined) {
                        this.set(spec.name, index, index, value[spec.name], false);
                    }
                }
            }
        },

        copy: function(sourceStart, sourceEnd, targetStart) {
            this.specs.forEach(function(spec) {
                this.properties[spec.name].copy(sourceStart, sourceEnd, targetStart);
            }, this);
        },

        iterator: function(name, start, end) {
            var prop = this.properties[name];
            var iter = prop.iterator(start, end);
            return {
                name: name,
                value: prop.list.range.value,
                at: function(index) {
                    return prop.parse(iter.at(index));
                }
            };
        },

        sortable: function() {
            return this.specs.filter(function(spec) { return spec.sortable; })
                .map(function(spec) {
                    return this.lists[spec.name];
                }, this);
        },

        iterators: function(start, end) {
            return this.specs.reduce(function(ret, spec) {
                if (spec.serializable) {
                    ret.push(this.iterator(spec.name, start, end));
                }
                return ret;
            }.bind(this), []);
        },

        forEach: function(start, end, callback) {
            var iterators = this.iterators(start, end);
            var hBorders = this.iterator("hBorders", start, end + 1);
            var leftBorders = this.iterator("vBorders", start, end);
            var rightBorders = this.iterator("vBorders", start + this.rowCount, end + this.rowCount);
            var values, index;

            function addBorder(name, iterator, index) {
                var val = iterator.at(index);
                if (val !== iterator.value) {
                    values[name] = val;
                }
            }

            for (index = start; index <= end; index++) {
                values = {};

                for (var i = 0; i < iterators.length; i++) {
                    var iterator = iterators[i];
                    var value = iterator.at(index);

                    if (value !== iterator.value) {
                        values[iterator.name] = value;
                    }
                }

                addBorder("borderLeft", leftBorders, index);
                addBorder("borderRight", rightBorders, index + this.rowCount);
                addBorder("borderTop", hBorders, index);
                addBorder("borderBottom", hBorders, index + 1);

                callback(values);
            }
        },

        forEachProperty: function(callback) {
            for (var name in this.properties) {
                callback(this.properties[name]);
            }
        }
    });

    kendo.spreadsheet.ALL_PROPERTIES = $.map(kendo.spreadsheet.PropertyBag.prototype.specs, function(spec) {
        return spec.name;
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
