<section id="using-havok" title="Using Havok">
  <div class="page-header">
    <h1>Using Havok</h1>
  </div>
  <p class="lead">Once havok is loaded, start using it!</p>

	<h2>AMD</h2>
	<p>Havok uses AMD (Async Module Definition) throughout. To load and use a module, use <code>require</code>. Eg:</p>
<pre class="prettyprint linenums">
&lt;script type=&quot;text/javascript&quot;&gt;
	require([
		'havok/widget/Modal', //load the Modal module
		'dojo/domReady!'      //wait until the dom is ready before executing the function
	], function(Modal){
		var modal = new Modal({title: 'Hello'}); //create a new modal
		modal.show();                            //show the modal
	})
&lt;/script&gt;
</pre>

    <h2>Get things started</h2>
	<p>Most users will probably want to put this script in their page to get havok services up and running. These are not manditory, but can be helpful.</p>
<pre class="prettyprint linenums">
&lt;script type=&quot;text/javascript&quot;&gt;
	require([
		'havok/exception/started!', //turn on havok exception handling
		'havok/router/started!',    //if you are using the havok router, then get it going
		'havok/parseComplete!'      //if you are using declarative widget creation, then this AMD plugin will block until the parse is complete
	], function(){
		//do something here if you want to
	})
&lt;/script&gt;
</pre>
		
</section>
