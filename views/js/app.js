/* App.js 
 * Ctrl K4 to fold
 */

/** Cliqon Functions - app() 
 * App.x() - app and utility functions, including:
 *
 *
 ******************************************************************************************************************/

    var App = (function($) {

        // initialise
        // var shared values
        var acfg = {
            useCaching: true,
            idioms: {},
            langcd: jlcd,
            df: new Object,
            dv: new Object, 
            table: 'dbuser',
            spinner: new Spinner()
        };

        var _set = function(key, value)
        {
            acfg[key] = value;
            return acfg[key];
        };

        var _get = function(key)
        {
            return acfg[key];
        };

        var _config = function()
        {
            return acfg;
        };

        /** Event and display functions
         *
         * actionButton() - responds to clicks on the nav bar
         *
         **************************************************************************************************************************/

            /** Menu Action Buttons
             * @param - object - event
             * @return - object The action
             **/
             var actionButton = function(e, dta)
             {
                var cfg = Cliq.config();

                function displayUsers() {
                    var urlstr = "/cms/"+jlcd+"/getusers/dbuser/client/";
                    return aja().method('GET').url(urlstr).cache(false).timeout(2500).type('json')
                    .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                    .on('500', function(response) {Cliq.error('Server Error - '+response)})
                    .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                    .on('success', function(response) {
                        if(typeof response == 'object') {
                            // Test NotOK - value already exists
                            var match = /NotOk/.test(response.flag);
                            if(!match == true) {
                                $('#tplcontent').html(response.msg);

                                // Callbacks

                            } else {
                                Cliq.error(response.msg);
                            }; 

                        } else { Cliq.error('Response was not JSON object - '+response.msg); }
                    }).go();                     
                }

                function displayAdmin() {
                    var urlstr = "/admindesktop/"+jlcd+"/dashboard/";
                    wLoad(urlstr);                    
                }

                function displayLogin() {
                    var urlstr = "/cms/"+jlcd+"/getuserlogin/dbuser/";
                    return aja().method('GET').url(urlstr).cache(false).timeout(2500).type('json')
                    .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                    .on('500', function(response) {Cliq.error('Server Error - '+response)})
                    .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                    .on('success', function(response) {
                        if(typeof response == 'object') {
                            // Test NotOK - value already exists
                            var match = /NotOk/.test(response.flag);
                            if(!match == true) {
                                $('#tplcontent').html(response.msg);

                                // Callbacks
                                $('#loginbutton').on('click', function(e) {
                                    e.preventDefault(); 
                                    loginUser(e);  
                                });

                                var form = $("#loginform");
                                form.on('keyup', function(e){
                                    var keycode = (e.keyCode ? e.keyCode : e.which);
                                    if(keycode == '13'){
                                        e.preventDefault();
                                        loginUser(e);
                                    }
                                });  

                                $('#forgotpassword').on('click', function(e) {
                                    e.preventDefault();   
                                    forgotPassword(e);                   
                                });

                                $('#register').on('click', function(e) {
                                    e.preventDefault();
                                    registerUser(e);
                                });         

                            } else {
                                Cliq.error(response.msg);
                            }; 

                        } else { Cliq.error('Response was not JSON object - '+response.msg); }
                    }).go();                      
                }

                function displayRegister() {
                    var urlstr = "/cms/"+jlcd+"/getuserregister/dbuser/";
                    return aja().method('GET').url(urlstr).cache(false).timeout(2500).type('json')
                    .data({recid: cfg.recid})
                    .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                    .on('500', function(response) {Cliq.error('Server Error - '+response)})
                    .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                    .on('success', function(response) {
                        if(typeof response == 'object') {
                            // Test NotOK - value already exists
                            var match = /NotOk/.test(response.flag);
                            if(!match == true) {
                                $('#tplcontent').html(response.msg);

                                // Callbacks
                                acfg.df = new Vue({
                                    el: '#dataform',
                                    data: {
                                        'row': response.data
                                    },
                                    methods: {
                                        // All forms
                                        previewbutton: function(evt) {
                                            var frmData = getFormData();
                                            cfg.spinner.stop();
                                            var tbl = `<div class="container maxh30 scrollable">
                                                <h3>`+lstr[7]+`</h3>
                                                <table class=\"table table-sm table-condensed table-bordered table-striped\">
                                            `;
                                            // Display the key/value pairs
                                            for(var pair of frmData.entries()) {
                                                tbl += `<tr style=\"font-weight:normal; font-size: 14px;\">
                                                    <td class=\"text-right orangec e20\">`+pair[0]+`</td>
                                                    <td class=\"text-left bluec e80\"><pre>`+rawurldecode(pair[1])+`</pre></td>
                                                </tr>`;
                                            }; tbl += `</table></div>`;
                                            Cliq.success(tbl);  
                                        },

                                        // All forms
                                        resetbutton: function(evt) {
                                            $('#dataform').clearform();
                                        },

                                        // Submit Button is not a submit
                                        submitbutton: function(evt) {
                                            // Make sure button is type = button, not type = submit !!
                                            evt.preventDefault();
                                            var urlstr = '/cms/'+jlcd+'/postuser/dbuser/';                  
                                            var frmData = getFormData();
                                            $.ajax({
                                                url: urlstr, data: frmData,
                                                cache: false, contentType: false, processData: false,
                                                type: 'POST', async: false, timeout: 25000,
                                                success: function(response, statusText, xhr) {
                                                    // Stop and close the Spinner
                                                    acfg.spinner.stop();
                                                    $('#tplcontent').empty().html(response.msg);
                                                }, 
                                                error: function(xhr, status, text) {
                                                    acfg.spinner.stop();
                                                    var response = $.parseJSON(xhr.responseText);
                                                    Cliq.error(JSON.stringify(response.msg));
                                                    return false;
                                                }
                                            });   
                                        }                                    
                                    },
                                    mounted: function(evt) {

                                        // HTML5 Text Types
                                            $('.isunique').on('blur', function() {
                                                var fldid = $(this).attr('id');
                                                var thisfld = $('#'+fldid);                                                        
                                                var urlstr = '/cms/'+jlcd+'/isunique/dbuser/';
                                                aja().method('GET').url(urlstr)
                                                .data({'fld': fldid, 'prefix': '', 'currval': $('#'+fldid).val() }).cache(false)
                                                .on('40x', function(response) {Cliq.error('Page not Found - '+response);})
                                                .on('500', function(response) {Cliq.error('Server Error - '+response);})
                                                .on('timeout', function(response) {Cliq.error('Timeout - '+response);})
                                                .on('success', function(response) {
                                                    if(typeof response == 'object')
                                                    {
                                                        // Test NotOK - value already exists
                                                        var match = /NotOk/.test(response.flag);
                                                        if(!match == true) {     
                                                            if(response.data) {
                                                                $('#'+fldid).val('');
                                                                $('#'+fldid).focus();
                                                                Cliq.error('Value already exists');
                                                            };     
                                                        } else { Cliq.error('Ajax function returned error NotOk - '+JSON.stringify(response)); }; 
                                                    } else { Cliq.error('Response was not JSON object - '+response.msg); }
                                                }).go();  
                                            });

                                        // Password
                                            $('#c_password').on('blur', function(e) {
                                                var id = $(this).attr('id');
                                                var p1 = $('#'+id).val();
                                                var p2 = $('#'+id+'_confirm').val();
                                                if(p1 != p2) {
                                                    $('#'+id).empty().focus();
                                                    Cliq.error(lstr[137]);
                                                }
                                            });
                                    }
                                }); // End Vue

                            } else {
                                Cliq.error(response.msg);
                            }; 

                        } else { Cliq.error('Response was not JSON object - '+response.msg); }
                    }).go();
                }

                function displayActivate() {
                    if(cfg.recid > 0) {
                        var urlstr = "/cms/"+jlcd+"/senduseractivation/dbuser/";
                        return aja().method('POST').url(urlstr).cache(false).timeout(2500).type('json')
                        .data({
                            'recid': cfg.recid
                        })
                        .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                        .on('500', function(response) {Cliq.error('Server Error - '+response)})
                        .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                        .on('success', function(response) {
                            if(typeof response == 'object') {
                                // Test NotOK - value already exists
                                var match = /NotOk/.test(response.flag);
                                if(!match == true) {
                                    $('#tplcontent').html(response.msg);
                                } else {
                                    Cliq.error(response.msg);
                                }; 

                            } else { Cliq.error('Response was not JSON object - '+response.msg); }
                        }).go();                             
                    } else {Cliq.error('You must login');};                    
                }

                function deleteRecord() {
                    return Cliq.msg({
                        buttons:  [
                            {addClass: 'm10 mt10 btn btn-success btn-sm', text: lstr[30], onClick: function($noty) {    
                                $noty.close(); 
                            }},
                            {addClass: 'm10 mt10 btn btn-danger btn-sm', text: lstr[114], onClick: function($noty) { 
                                
                                var urlstr = "/cms/"+jlcd+"/deleteuser/dbuser/";;
                                aja().method('POST').url(urlstr).cache(false).timeout(2500).type('json')
                                .data({
                                    'recid': cfg.recid,
                                })
                                .on('40x', function(response) {Cliq.error('Page not Found - '+response);})
                                .on('500', function(response) {Cliq.error('Server Error - '+response);})
                                .on('timeout', function(response) {Cliq.error('Timeout - '+response);})
                                .on('success', function(response) {
                                    if(typeof response == 'object') {
                                        // Test NotOK - value already exists
                                        var match = /NotOk/.test(response.flag);
                                        if(!match == true) {  
                                            var originalnoty = $noty;
                                            Cliq.success(lstr[146]+': ' + JSON.stringify(response.msg));
                                            originalnoty.close();                                    
                                            reLoad();                
                                        } else { Cliq.error('Ajax function returned error NotOk - '+JSON.stringify(response)); };
                                    } else { Cliq.error('Response was not JSON object - '+response.msg); };
                                }).go();                             
                            }}                                              
                        ],
                        timeout: false,
                        closeWith: ['button'],
                        type: 'warning',
                        text: 'Delete User: '+cfg.recid      
                    });                     
                }

                function displayProfile() {
                    if(cfg.recid > 0) {
                        var urlstr = "/cms/"+jlcd+"/viewuser/dbuser/";
                        return aja().method('GET').url(urlstr).cache(false).timeout(2500).type('json')
                        .data({recid: cfg.recid})
                        .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                        .on('500', function(response) {Cliq.error('Server Error - '+response)})
                        .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                        .on('success', function(response) {
                            if(typeof response == 'object') {
                                // Test NotOK - value already exists
                                var match = /NotOk/.test(response.flag);
                                if(!match == true) {
                                    $('#tplcontent').empty().html(response.msg);

                                    // Then overlay the data using Vue
                                    acfg.dv = new Vue({
                                        el: '#clqtable',
                                        data: {
                                            'usr': response.data
                                        }, 
                                        computed: {
                                            // Full name
                                            fullName: function () {
                                                var nme = this.usr.d_firstname + ' ';
                                                this.usr.d_midname != '' ? nme += this.usr.d_midname + ' ': null ;
                                                nme += this.usr.d_lastname;
                                                return nme;
                                            },
                                            // Full address
                                            fullAddress: function () {
                                                var addr = this.usr.d_addr1 + ', ';
                                                this.usr.d_addr2 != '' ? addr += this.usr.d_addr2 + ', ': null ;
                                                // this.usr.d_suburb != '' ? addr += this.usr.d_suburb + ', ': null ;
                                                this.usr.d_postcode != '' ? addr += this.usr.d_postcode + ', ': null ;
                                                this.usr.d_city != '' ? addr += this.usr.d_city + ', ': null ;
                                                this.usr.d_region != '' ? addr += this.usr.d_region + ', ': null ;
                                                this.usr.d_country != '' ? addr += this.usr.d_country: null ;
                                                return addr;
                                            }
                                        },
                                        mounted: function() {

                                            var opts = {
                                                'urlstr': '/ajax/'+jlcd+'/getcatvalue/dbcollection/list/',
                                                'data': {
                                                    'listname': 'userstatus',
                                                    'value': this.usr.c_status
                                                },
                                                'fldname': 'c_status'
                                            };
                                            lookup(opts);

                                            var opts2 = {
                                                'urlstr': '/ajax/'+jlcd+'/getcatvalue/dbcollection/list/',
                                                'data': {
                                                    'listname': 'usergroups',
                                                    'value': this.usr.c_group
                                                },
                                                'fldname': 'c_group'
                                            };
                                            lookup(opts2);
                                          
                                        }
                                    });
                                    
                                } else {
                                    Cliq.error(response.msg);
                                }; 

                            } else { Cliq.error('Response was not JSON object - '+response.msg); }
                        }).go();                               
                    } else {Cliq.error('You must login');};
                }

                function changeStatus() {
                    if(cfg.recid > 0) {
                        var tpl = `
                            <div class="noty_message minh3">
                                <div class="pad center">
                                   <div class="noty_text"></div> 
                                </div>
                                <div class="noty_close"></div>
                            </div>
                        `;
                        var status = {
                            'approval': 'Avaiting Approval',
                            'inactive': 'Access denied',
                            'active': 'Access allowed',
                            'archived': 'Archived'
                        };
                        var txt = `
                            <label for="status" class="text-left bluec bold">Status</label>
                            <select id="status" name="c_status" class="custom-select">`;
                                $.each(status, function(val, lbl) {
                                    txt += '<option value="'+val+'">'+lbl+'</option>';
                                });
                            txt += `</select>
                        `;    
                        return Cliq.msg({
                            buttons:  [
                                {addClass: 'm10 mt10 btn btn-primary btn-sm', text: lstr[53], onClick: function($noty) { 
                                    
                                    var urlstr = "/cms/"+jlcd+"/changeuserstatus/dbuser/";
                                    aja().method('POST').url(urlstr).cache(false).timeout(2500).type('json')
                                    .data({
                                        'id': cfg.recid,
                                        'fldname': 'c_status',
                                        'value': $('#status').getValue()
                                    })
                                    .on('40x', function(response) {Cliq.error('Page not Found - '+response);})
                                    .on('500', function(response) {Cliq.error('Server Error - '+response);})
                                    .on('timeout', function(response) {Cliq.error('Timeout - '+response);})
                                    .on('success', function(response) {
                                        if(typeof response == 'object') {
                                            // Test NotOK - value already exists
                                            var match = /NotOk/.test(response.flag);
                                            if(!match == true) {  
                                                var originalnoty = $noty;
                                                originalnoty.close();                                    
                                                Cliq.loadTableData();                
                                            } else { Cliq.error('Ajax function returned error NotOk - '+JSON.stringify(response)); };
                                        } else { Cliq.error('Response was not JSON object - '+response.msg); };
                                    }).go();                             
                                }},
                                {addClass: 'm10 mt10 btn btn-success btn-sm', text: lstr[30], onClick: function($noty) {    
                                    $noty.close(); 
                                }}                                                                               
                            ],
                            timeout: false,
                            closeWith: ['button'],
                            type: 'info',
                            text: txt,
                            template: tpl   
                        });                   
                    } else {Cliq.error('You must login');};
                }

                function changePassword() {
                    if(cfg.recid > 0) {
                        var tpl = `
                            <div class="noty_message minh3">
                                <div class="pad center">
                                   <div class="noty_text"></div> 
                                </div>
                                <div class="noty_close"></div>
                            </div>
                        `;
                        var txt = `
                            <label for="status" class="text-left bluec bold">Change Password</label>
                            <input type="password" placeholder="*******" name="newpassword" class="form-control"  />
                        `;    
                        return Cliq.msg({
                            buttons:  [
                                {addClass: 'm10 mt10 btn btn-primary btn-sm', text: lstr[53], onClick: function($noty) { 
                                    
                                    var urlstr = "/cms/"+jlcd+"/changepassword/dbuser/";
                                    aja().method('POST').url(urlstr).cache(false).timeout(2500).type('json')
                                    .data({
                                        'id': cfg.recid,
                                        'fldname': 'c_password',
                                        'value': $('#newpassword').getValue()
                                    })
                                    .on('40x', function(response) {Cliq.error('Page not Found - '+response);})
                                    .on('500', function(response) {Cliq.error('Server Error - '+response);})
                                    .on('timeout', function(response) {Cliq.error('Timeout - '+response);})
                                    .on('success', function(response) {
                                        if(typeof response == 'object') {
                                            // Test NotOK - value already exists
                                            var match = /NotOk/.test(response.flag);
                                            if(!match == true) {  
                                                var originalnoty = $noty;
                                                originalnoty.close();                                    
                                                Cliq.loadTableData();                
                                            } else { Cliq.error('Ajax function returned error NotOk - '+JSON.stringify(response)); };
                                        } else { Cliq.error('Response was not JSON object - '+response.msg); };
                                    }).go();                             
                                }},
                                {addClass: 'm10 mt10 btn btn-success btn-sm', text: lstr[30], onClick: function($noty) {    
                                    $noty.close(); 
                                }}                                                                               
                            ],
                            timeout: false,
                            closeWith: ['button'],
                            type: 'info',
                            text: txt,
                            template: tpl   
                        });  
                    } else {Cliq.error('You must login');};
                }

                function forgotPassword() {
                    var urlstr = "/cms/"+jlcd+"/forgottenpassword/dbuser/";
                    return aja().method('POST').url(urlstr).cache(false).timeout(2500).type('json')
                    .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                    .on('500', function(response) {Cliq.error('Server Error - '+response)})
                    .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                    .on('success', function(response) {
                        if(typeof response == 'object') {
                            // Test NotOK - value already exists
                            var match = /NotOk/.test(response.flag);
                            if(!match == true) {
                                $('#tplcontent').html(response.html);

                                acfg.df = new Vue({
                                    el: response.data.el,
                                    data: {'row': response.data.data},
                                    methods: {
                                        // All forms
                                        resetbutton: function(evt) {
                                            $(response.data.el).clearform();
                                        },

                                        // Submit Button is not a submit
                                        submitbutton: function(evt) {
                                            // Make sure button is type = button, not type = submit !!
                                            evt.preventDefault();
                                            var urlstr = '/cms/'+jlcd+'/resetpassword/dbuser/';                  
                                            var frmData = getFormData();
                                            $.ajax({
                                                url: urlstr, data: frmData,
                                                cache: false, contentType: false, processData: false,
                                                type: 'POST', async: false, timeout: 25000,
                                                success: function(response, statusText, xhr) {
                                                    acfg.spinner.stop();
                                                    var $noty = Cliq.msg(response.msg); // returns $noty

                                                    $('.closenoty').on('click', function(e) {
                                                        $noty.close();
                                                    });

                                                    $('.submitnoty').on('click', function(e) {
                                                        e.preventDefault();
                                                        var newp = $('input[name="c_password"]').val();
                                                        var confp = $('input[name="c_password_confirm"]').val();
                                                        
                                                        // Check if Passwords are equal
                                                        if(newp === confp) {
                                                            // Check if password is strong enough
                                                            newp = passwordStrength(newp);
                                                            if(newp != "") {
                                                                var uid = $('input[name="id"]').val();
                                                                var frmData = new FormData();
                                                                frmData.append('c_password', newp);
                                                                frmData.append('id', uid);
                                                                var urlstr = '/cms/'+jlcd+'/dochangepassword/dbuser/';
                                                                $.ajax({
                                                                    url: urlstr, data: frmData,
                                                                    cache: false, contentType: false, processData: false,
                                                                    type: 'POST', async: false, timeout: 25000,
                                                                    success: function(response, statusText, xhr) {
                                                                        if(typeof response == 'object') {
                                                                            // Test NotOK - value already exists
                                                                            var match = /NotOk/.test(response.flag);
                                                                            if(!match == true) {
                                                                                Cliq.success(response.msg)
                                                                            } else {
                                                                                Cliq.error(response.msg);
                                                                            }; 
                                                                        } else { Cliq.error('Response was not JSON object - '+response.msg); }            
                                                                    }, 
                                                                    error: function(xhr, status, text) {
                                                                        var response = $.parseJSON(xhr.responseText);
                                                                        Cliq.error(JSON.stringify(response.msg));
                                                                        return false;
                                                                    }, 
                                                                    complete: function() {
                                                                        $noty.close();
                                                                    }
                                                                });  
                                                            } else {
                                                                Cliq.error(lstr[149]);
                                                            };
                                                        } else {
                                                            Cliq.error(lstr[137]);
                                                        }
                                                    });
                                                }, 
                                                error: function(xhr, status, text) {
                                                    acfg.spinner.stop();
                                                    var response = $.parseJSON(xhr.responseText);
                                                    Cliq.error(JSON.stringify(response.msg));
                                                    return false;
                                                }
                                            });   
                                        }  
                                    }
                                });

                            } else {
                                Cliq.error(response.msg);
                            }; 

                        } else { Cliq.error('Response was not JSON object - '+response.msg); }
                    }).go();                     
                }

                function logOut() {
                    if(cfg.recid > 0) {
                        Cliq.success('Logout');
                    } else {Cliq.error('You must login');};
                }

                function testEmail() {
                    var urlstr = "/cms/"+jlcd+"/testemail/dbuser/";
                    return aja().method('GET').url(urlstr).cache(false).timeout(2500).type('json')
                    .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                    .on('500', function(response) {Cliq.error('Server Error - '+response)})
                    .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                    .on('success', function(response) {
                        if(typeof response == 'object') {
                            // Test NotOK - value already exists
                            var match = /NotOk/.test(response.flag);
                            if(!match == true) {
                                $('#tplcontent').html(response.msg);

                                // Callbacks
                                acfg.df = new Vue({
                                    el: '#dataform',
                                    data: {
                                        'row': response.data
                                    },
                                    methods: {
                                        // Submit Button is not a submit
                                        sendbutton: function(evt) {
                                            // Make sure button is type = button, not type = submit !!
                                            evt.preventDefault();
                                            var urlstr = '/cms/'+jlcd+'/dotestemail/dbcollection/';                  
                                            var frmData = getFormData();
                                            $.ajax({
                                                url: urlstr, data: frmData,
                                                cache: false, contentType: false, processData: false,
                                                type: 'POST', async: false, timeout: 25000,
                                                success: function(response, statusText, xhr) {
                                                    // Stop and close the Spinner
                                                    acfg.spinner.stop();
                                                    $('#tplcontent').empty().html(response);
                                                }, 
                                                error: function(xhr, status, text) {
                                                    acfg.spinner.stop();
                                                    var response = $.parseJSON(xhr.responseText);
                                                    $('#resultblock').html(response);
                                                    return false;
                                                }
                                            });   
                                        }
                                    }
                                }); // End Vue
                            } else {
                                Cliq.error(response.msg);
                            }; 

                        } else { Cliq.error('Response was not JSON object - '+response.msg); }
                    }).go(); 
                }

                function deFault() {
                    Cliq.success(dta.action);
                }

                // List all actions here
                var actions = {
                    'displayusers': displayUsers,
                    'displayadmin': displayAdmin,    
                    'displaylogin': displayLogin,   
                    'editrecord': displayRegister,
                    'displayregister': displayRegister,
                    'displayactivate': displayActivate,
                    'deleterecord': deleteRecord,
                    'displayprofile': displayProfile,
                    'viewrecord': displayProfile,
                    'changestatus': changeStatus,
                    'changepassword': changePassword,
                    'forgotpassword': forgotPassword,
                    'logout': logOut,
                    'testemail': testEmail,
                    'default': deFault
                };

                return (actions[dta.action] || actions['default'])();
             }

        /** Action functions
         * getFormData()
         * loginUser()
         * passwordStrength()
         * lookup()
         *
         **************************************************************************************************************************/

            /** Get all form data for a form  
             * A function to collect any and all data, including files from a form
             * @param - boolean - add filename
             * @param - string - 
             * @return - object - the FormData
             **/
             var getFormData = function() {       

                // Define the Form ID
                    var id = 'dataform'; var thisform = $('#'+id);

                // Start a Spinner
                    var target = document.getElementById(acfg.formid); acfg.spinner.spin(target); 

                // validation here  if required

                // Now get Data from the Vue Instance
                    var postData = acfg.df.$data.row;                            

                // Now convert Postdata to FormData
                    var frmData = new FormData();
                    $.each(postData, function(fld, val) {
                        frmData.set(fld, val);
                    });

                    // frmData.append('token', jwt);
    
                return frmData;     
             }

            /** Login User  
             * @@param - object - click event
             * @@return - redirect to admin page or display error message
             **/  
             var loginUser = function(e) 
             {
                var cfg = Cliq.config();
                var form = $("#loginform");
                $.validate({
                    modules : 'html5',
                    errorMessagePosition : 'top' // Instead of 'inline' which is default
                });

                // Login used the default language for the browser but is changed by the user at this point
                var urlstr = "/ajax/"+jlcd+"/login/dbuser/";
                return aja().method('POST').url(urlstr).cache(false).timeout(2500).type('json')
                .data({
                    username: $('input[name="username"]').fieldValue(),
                    password: $('input[name="password"]').fieldValue(),
                    rememberme: $('input[name="rememberme"]').fieldValue(),
                    langcd: 'en'
                })
                .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                .on('500', function(response) {Cliq.error('Server Error - '+response)})
                .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                .on('success', function(response) {
                    if(typeof response == 'object') {
                        
                        // Test NotOK - value already exists
                        var match = /NotOk/.test(response.flag);
                        if(!match == true) {
                            cfg.recid = response.data.recid;
                            $('#tplcontent').html(response.msg);
                        } else {
                            Cliq.error("Your username and password were not accepted, Please try again");
                        }; 

                    } else { Cliq.error('Response was not JSON object - '+response.msg); }
                }).go();      
             }             

            /** Password strength 
             *
             **/ 
             var passwordStrength = function(pwd) 
             {
                var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
                var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
                var enoughRegex = new RegExp("(?=.{6,}).*", "g");

                // Change if necessary
                if(strongRegex.test(pwd)) {
                    return pwd;
                } else {
                    return '';
                }
             }

            /** Generic Category lookup to support Vue client side templating
             * @array - passed variable
             * @return - string - replace variable
             **/
             function lookup(opts) 
             {
                return aja().method('GET').url(opts.urlstr).cache(false).timeout(2500).type('json')
                .data(opts.data)
                .on('40x', function(response) {Cliq.error('Page not Found - '+response)})
                .on('500', function(response) {Cliq.error('Server Error - '+response)})
                .on('timeout', function(response) {Cliq.error('Timeout - '+response)})
                .on('success', function(response) {
                    if(typeof response == 'object') { 
                        acfg.dv.$data.usr[opts.fldname] = response.msg;
                    } else { Cliq.error('Response was not JSON object - '+response.msg); }
                }).go();   
             }

    // explicitly return public methods when this object is instantiated
    return {
        // outside: inside
        set: _set,
        get: _get,    
        config: _config,     
        actionbtn: actionButton,
        userlogin: loginUser
    }; 

})(jQuery);       
