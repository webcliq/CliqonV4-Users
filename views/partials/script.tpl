<script>
var sitepath = "@raw($protocol)"+document.location.hostname+"/"; 
var jspath = sitepath+"includes/js/";
var viewpath = sitepath+"views/"; 
var jlcd = '@($idiom)', lstr = [], str = [];
var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
var jwt = "@raw($jwt)"; // This is now essential

// basket.clear(true);
basket
.remove('app', 'cliq')
.require(  
    {url: jspath+"library.js"},
    {url: viewpath+"js/library.js", key: "init"},
    {url: viewpath+"js/jspanel.min.js"},
    {url: jspath+"vue.js"},
    {url: jspath+"phpjs.js"}, 
    {url: jspath+"i18n/cliqon."+jlcd+".js"},   
    {url: viewpath+"js/cliqon.js", key: "cliq", skipCache: true},
    {url: viewpath+"js/app.js", key: "app", skipCache: true}
).then(function(msg) {

    // Javascript language file load
    lstr = str[jlcd];

    $(".menubutton").on('click', function(e) { 
        e.preventDefault();  
        var dta = $(this).data(); 
        App.actionbtn(e, dta);
    }); 

    /* ---------- Introduce Page Scripts here  -------------*/

    @raw($scripts)

}, function (error) {
    // There was an error fetching the script
    console.log(error);
}); 
</script>