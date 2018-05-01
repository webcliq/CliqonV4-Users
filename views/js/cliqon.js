/**
 * Cliq.Js
 *
 */

 /** Cliqon Functions - cliq() 
  * cliq.x() - app and utility functions, including:
  *
  *  notyMsg = msg(usroptions)
  *  jsPanelWin = win(usroptions)
  *
  ******************************************************************************************************************/

    var Cliq = (function($) {

        // initialise
        // var shared values
        var cfg = {
            useCaching: true,
            langcd: jlcd,
            sitepath: sitepath,
            spinner: new Spinner(),
            df: new Object, // Form
            dt: new Object, // Tree or Table etc
            recid: 0,
            // Datatable pagination and operational defaults
            orderby: 'c_username|asc', 
            search: '',
            select: new Array,            
            records: {
                offset: 0,     
                limit: 15,                              
                start: 1,
                end: 15,
                total: 0,
                page: 1,
                totpages: 1
            },
            pager: {
                size: 3,
                recs: 15
            },
            subdir: 'tmp/', uploadurl: '/cms/'+jlcd+'/fileupload/dbuser/', filescollection: 'file',
            opts: {}, data: {}, app: {}
        };

        var _set = function(key, value)
        {
            cfg[key] = value;
            return cfg[key];
        };

        var _get = function(key)
        {
            return cfg[key];
        };

        var _config = function()
        {
            return cfg;
        };

        /** Cliqon Datatable for Users and supporting functions
         *
         *
         *
         *
         ************************************************** Functions  ******************************************************/

            /** DataTable 
             *
             * @param - 
             * @return - 
             **/
             var dataTable = function(tableOptions)
             {             
                cfg.opts = tableOptions;
                cfg.records = cfg.opts.records;
                // var pageselect = explode(',', cfg.opts.pager);

                cfg.dt = new Vue({
                    el: '#'+cfg.opts.tableId,
                    data: {
                        cols: cfg.opts.columns,
                        rows: {},
                        rowicons: cfg.opts.rowicons,
                        records: {
                            recordstxt: lstr[143],
                            fromtxt: lstr[140],
                            totxt: lstr[142],
                            start: cfg.records.start,
                            end: cfg.records.end,
                            total: cfg.records.total
                        },
                        selected: cfg.records.limit,
                        pagerselect: cfg.opts.pagerselect                  
                    },
                    methods: {

                        // Search, sort and filter buttons
                        searchbutton: function(event) {
                            cfg.records.offset = 0;
                            var colname = $(event.target).data('id');
                            cfg.search = colname+'|'+$('input[data-name="'+colname+'"]').val();
                            loadTableData();
                        },

                        // Clear the search field
                        clearbutton: function(event) {
                            var colname = $(event.target).data('id');
                            $('input[data-name="'+colname+'"]').val('');
                            if(cfg.search != '') {
                                cfg.search = '';
                                loadTableData();
                            }
                        },

                        // Row icons
                        rowbutton: function(event, row) {
                            var dta = $(event.target).data();
                            return rowicon(event, row.id, dta.action, dta);                            
                        },

                        // Sort or Order buttons
                        sortbutton: function(event) {
                            var colname = $(event.target).data('id');
                            cfg.opts.orderby = colname+'|asc';
                            loadTableData();                       
                        }

                    },
                    mounted: function() {
                        loadTableData();

                        // softblue

                        $('#pageselect').on('change', function(evt) {
                            cfg.records.limit = $(this).val();
                            loadTableData();
                        });
                    }
                });
             };

            /** Generic Row Icon for Tables etc.
             * @param - object - Event
             * @param - array - Row data
             * @return the the action
             **/
             var rowicon = function(event, recid, action, dta)
             {
                cfg.recid = recid;
                dta.action = action;
                App.actionbtn(event, dta);
             }

            /** Load data for a datalist or datatable
             *
             * @return - Sets the Data for Vue and starts process of populating pager
             **/
             var loadTableData = function()
             {

                var orderby; if(cfg.opts.orderby != '') {orderby = cfg.opts.orderby;} else {orderby = cfg.orderby;};
                var urlstr = cfg.opts.url;
                aja().method('GET').url(urlstr).cache(false).timeout(10000).type('json')
                .data({
                    limit: cfg.records.limit,
                    offset: cfg.records.offset,
                    search: cfg.search,
                    orderby: orderby,
                    field_identifier: 'field'
                })
                // .jsonPaddingName('clientRequest')
                // .jsonPadding('cliqon') // ajajsonp_omni
                .on('40x', function(response) { error('Page not Found - '+urlstr+':'+response)})
                .on('500', function(response) { error('Server Error - '+urlstr+':'+response)})
                .on('timeout', function(response){ error('Timeout - '+urlstr+':'+response)})
                .on('200', function(response) {
                    if(typeof response == 'object')
                    {
                        // Test NotOK - value already exists
                        var match = /NotOk/.test(response.flag);
                        if(!match == true) {

                            cfg.records.offset = response.offset;
                            cfg.records.limit = response.limit;
                            cfg.records.total = response.total;
                            cfg.dt.$data.rows = response.rows;
                            pagerText();

                        } else { error('Ajax function returned error NotOk - '+urlstr+':'+JSON.stringify(response)); };
                    } else { error('Response was not JSON object - '+urlstr+':'+response.msg); };
                }).go();    
             }

            /** Deals with the TWBS Pagination
             *
             * populates a given Div with a Bootstrap pager component
             **/
             var tablePagination = function()
             {

                var cl = 'page-item bold larger';
                cfg.records.totpages = Math.ceil(cfg.records.total / cfg.records.limit);
                // console.log(cfg.records, cfg.pager);
                return $('#tablepagination').twbsPagination({
                    totalPages: cfg.records.totpages,
                    visiblePages: cfg.pager.size,
                    startPage: 1,
                    initiateStartPageClick: false,
                    onPageClick: function (event, thispage) {
                        cfg.records.page = thispage;
                        if(cfg.records.page == 1) {
                           cfg.records.offset = 0;
                        };
                        // This handles the click on the cfg.records.page page number
                        if(cfg.records.page > 1 || cfg.records.page < cfg.records.totpages) {
                            cfg.records.offset = ((cfg.records.page - 1) * cfg.records.limit);
                        };
                        loadTableData();
                    },
                    first: '<<', prev: '<', next: '>', last: '>>',
                    nextClass: cl, prevClass: cl, lastClass: cl,
                    firstClass: cl, pageClass: 'page-item', activeClass: 'active',
                    disabledClass: 'disabled', anchorClass: 'page-link'
                });
             }

            /** Pager Text
             * page: 1, pageLength: 15, visiblePages: 7, totrecs: 1, offset: 0, limit: 0 
             * cfg.offset = Is the exact number of records into the recordset and is generated from response.offset;
             * cfg.page = Representation of a valid and current page number - say 1 to 7 - it is calculated from Offset using Limit
             * cfg.limit = response.limit - the number of records to display
             * cfg.totrecs = response.totrecs - the total number of records
             **/
             var pagerText = function() 
             {               
                cfg.pager.recs = cfg.records.limit;
                // Value for start, end and page must always be numeric
                cfg.records.start = parseInt(cfg.records.start);
                cfg.records.end = parseInt(cfg.records.end);
                cfg.records.page = parseInt(cfg.records.page);

                if(cfg.records.offset > cfg.records.start) {
                    cfg.records.start = cfg.records.offset + 1;
                    cfg.records.end = cfg.records.offset + cfg.records.limit;
                };

                // End number can never be more than total 
                if(cfg.records.end > cfg.records.total || (cfg.records.limit + cfg.records.offset) > cfg.records.total) {
                    cfg.records.end = cfg.records.total;
                };

                if(cfg.records.offset == 0) {
                    cfg.records.start = 1;
                    cfg.records.end = cfg.records.limit;
                }

                /*
                // From the response we need to work out the pager text values
                if(cfg.records.offset > 1 || cfg.records.offset < cfg.records.total) {
                    cfg.records.start = cfg.records.offset;
                } else if((cfg.records.offset + cfg.records.limit) > cfg.records.total) {
                    cfg.records.start = ((cfg.records.total - cfg.records.offset) + 1);
                } else if((cfg.records.offset + cfg.records.limit) < cfg.records.total) {
                    cfg.records.start = ((cfg.records.total - cfg.records.offset) + 1);
                }     
                */

                // console.log(cfg.records, cfg.pager);                   

                cfg.dt.$data.records.start = cfg.records.start;
                cfg.dt.$data.records.end = cfg.records.end;
                cfg.dt.$data.records.total = cfg.records.total;    

                if(cfg.records.total > cfg.records.limit) {
                    tablePagination();
                }            
             }

        /** General Display Utilities
         * 
         * msg()
         * - success()
         * - error()
         * win()
         *******************************************************************************************************/ 

            var success = function(text) { return msg({type: 'success', buttons: false, text: text});  }  

            var error = function(text) { return msg({type: 'warning', buttons: false, text: text}); }  
            
            /** Noty Alert box  
             *
             * @param - object - Usroptions that overwrite defaults
             **/
             var msg = function(usroptions) 
             {
                // usroptions = array
                var tpl = `
                    <div class="noty_message minh3">
                        <div class="pad center">
                           <h4 class="noty_text bluec"></h4> 
                        </div>
                        <div class="noty_close"></div>
                    </div>
                `;
                var options = {
                    'text': '',
                    'layout':'topCenter',
                    'timeout': 5000,
                    // success (light green), error (pink), warning (orangey cream), information (lilac), notification (lilac)
                    'type':'success', 
                    'buttons':  [
                        {addClass: 'm10 mt0 btn btn-success btn-sm', text: 'Close', onClick: function($noty) { $noty.close(); }}
                    ],
                    'template': tpl,
                     callback: {
                        onShow: function() {},
                        afterShow: function() {},
                        onClose: function() {},
                        afterClose: function() {},
                        onCloseClick: function() {}
                    }
                };
                options = array_replace(options, usroptions);
                var $noty = noty(options);
                return $noty;
             }

            /** jsPanel 4 - to avoid Tag Cloud
             * JSPanel Window - supports HTML content direct, HTML content from existing Div, Content by Ajax and iFrame
             * @param - object - Usroptions that overwrite defaults
             **/
             var win = function(usroptions)
             {
                cfg.dp++;
                var thisid = 'jsPanel-'+cfg.dp;
                var options = {
                    id: thisid,
                    boxShadow: 3,
                    container: document.body,
                    contentSize: {width: '400px', height: '200px'},
                    dragit: {
                        cursor:  'move',
                        handles: '.jsPanel-headerlogo', 
                        opacity: 0.8,
                        disableOnMaximized: true
                    },
                    header: true,
                    iconfont:    ['custom-smallify', 'custom-unsmallify', 'custom-minimize',  'custom-normalize', 'custom-maximize', 'custom-close'],
                    headerLogo: '<img src="'+sitepath+'views/img/logo.png" class="hlf-pad" />',
                    headerControls: 'all',
                    headerTitle: '',
                    maximizedMargin: 0,
                    minimizeTo: 'default',
                    paneltype: 'standard',
                    position: 'center',
                    resizeit: {
                        handles:     'n, e, s, w, ne, se, sw, nw',
                        minWidth:    40,
                        minHeight:   40,
                    },
                    theme: 'bootstrap-secondary',
                    content: '',
                    footerToolbar: '<span style="flex:1 1 auto">Print article</span><button id="btn-print" class="jsPanel-ftr-btn btn btn-sm btn-secondary" type="button"><i class="fa fa-print pointer"></i>&nbsp;Print</button>',
                    callback: function (panel) {
                        // handlers for the toolbar items like:
                        jsPanel.pointerup.forEach(function (evt) {
                            panel.footer.querySelector('#btn-print').addEventListener(evt, function () {
                                $(panel.content).print();
                            });
                        });
                    }                     
                };
                options = array_replace(options, usroptions);
                jsPanel.create({config: options});
                $('#'+thisid).css('z-index', 10000+cfg.dp);                
             } 

        // explicitly return public methods when this object is instantiated
        return {
            // outside: inside
            set: _set,
            get: _get,
            config: _config,
            datatable: dataTable,
            loadTableData: loadTableData,
            win: win,
            error:error,
            success: success,
            msg: msg
        };  

    })(jQuery); 


function razr(code, data) {

    //escape "@@" into one "@"
    code = code.split("@@").join("\1");
    var parts = code.split("@");
    var buff = parts.map(function (a, b) {
        if (!b) {
            return JSON.stringify(a);
        } /* end if */

        var l = a.split(/([<\n"])/),
            code = l[0];
        return code + "+\n" + JSON.stringify(l.slice(1).join(""));
    }).join("+");

    buff = buff.replace(/(for\(\s*)(\w+)(\s+in)(\s+)(\w+)(\s*\))(\+\r?\n)([^\n]+)\+\n/gm,
        "(function lamb(){var b=[]; $1$2$3$4 $5$6 { if( $5.hasOwnProperty($2)){ $2=$5[$2]; b.push($8);}}; return b.join(''); }())+ ");
    with(data) {
        return eval(buff).split("\1").join("@");
    }

}; /* end razr() */

