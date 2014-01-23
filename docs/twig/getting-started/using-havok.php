<h1>Using Havok</h1>

<p class="lead">Once havok is loaded, start using it!</p>

<h2>Parser</h2>


<h2>AMD</h2>
<p>Havok uses AMD (Async Module Definition) throughout. To load and use a module, use <code>require</code>. Eg:</p>
<pre class="prettyprint linenums">
{% set useingExample1 %}
<script type=""text/javascript">
	require([
		'havok/widget/Modal', //load the Modal module
		'dojo/domReady!'      //wait until the dom is ready before executing the function
	], function(Modal){
		var modal = new Modal;                            //create a new modal widget
        modal.header.innerHTML = 'Hello';                 //give the modal a title
        modal.containerNode.innerHTML = 'My first modal'; //give the modal some content
        modal.startup();                                  //startup the widget
		modal.show();                                     //show the modal
	})
</script>{% endset %}{{useingExample1|e}}
</pre>
