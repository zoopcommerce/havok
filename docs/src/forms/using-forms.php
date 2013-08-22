<section id="using-forms" title="Using Forms">
  <div class="page-header">
    <h1>Using Forms</h1>
  </div>

    <h2>Form widgets</h2>

    <p>Havok provides a wide range of enhanced form elements for the input and validation of data. They can be used stand alone. However, use inside a form provides powerful data binding functions.</p>

    <h2>Data binding</h2>

    <h3>Example</h3>
    <p>Any havok form widges wrapped in a <code>havok/form/Form</code> will automatically data bind. Eg: </p>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <form data-dojo-type="havok/form/Form">
                    <input data-dojo-type="havok/form/TextBox"
                        name="something"
                        data-dojo-props="
                            label:'Something',
                            helpMessages: 'please write something',
                            value: 'example@example.com'
                        "
                     />
                    <input data-dojo-type="havok/form/ValidationTextBox"
                           name="somethingelse"
                           data-dojo-props="label: 'Something Else', validator: 'Alpha'"
                           value = "asdf123"
                    />
                    <input data-dojo-type="havok/form/DateTextBox"
                        name="date"
                        data-dojo-props="
                           label: 'Date',
                           helpMessages: 'please select a date'
                        "
                    />
                </form>
             </div>
          </div>
<pre class="prettyprint linenums">
&lt;form data-dojo-type=&quot;havok/form/Form&quot;&gt;
    &lt;input data-dojo-type=&quot;havok/form/TextBox&quot;
        name=&quot;something&quot;
        data-dojo-props=&quot;
            label:'Something',
            helpMessages: 'please write something',
            value: 'example@example.com'
        &quot;
     /&gt;
    &lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
           name=&quot;somethingelse&quot;
           data-dojo-props=&quot;label: 'Something Else', validator: 'Alpha'&quot;
           value = &quot;asdf123&quot;
    /&gt;
    &lt;input data-dojo-type=&quot;havok/form/DateTextBox&quot;
        name=&quot;date&quot;
        data-dojo-props=&quot;
           label: 'Date',
           helpMessages: 'please select a date'
        &quot;
    /&gt;
&lt;/form&gt;
</pre>

    <h3>Form value</h3>

    <p>The value of all the contained widgets can be set and retrieved through the form's value property. Use:</p>

    <ul>
        <li><code>myform.set('value', valueObj)</code> to set a form's value.</li>
        <li><code>myform.get('value')</code> to get a form's value.</li>
        <li><code>myform.watch('value', function)</code> to watch a form's value.</li>
    </ul>

    <h3>Form state</h3>

    <p>The state reflects the state of the contained widgets. If the state is an empty string, the state is good. If the state is something else, the form is not valid. Use:</p>

    <ul>
        <li><code>myform.set('state', valueObj)</code> to set a form's state.</li>
        <li><code>myform.get('state')</code> to get a form's state.</li>
        <li><code>myform.watch('state', function)</code> to watch a form's state.</li>
    </ul>

    <h3>Modals</h3>

    <p>Modals behave like forms by default. Eg:</p>

    <div class="bs-docs-example">
        <script>
            require(['dojo/dom', 'dojo/on', 'dijit/registry', 'dojo/domReady!'], function(dom, on, registry){
                on(dom.byId('formModalButton1'), 'click', function(){
                    registry.byId('formModal1').show();
                })
            })
    </script>
       <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
           <button class="btn" id="formModalButton1">Show modal</button>
          <div id="formModal1" data-dojo-type="havok/widget/Modal" title="Form Modal">
              <input data-dojo-type="havok/form/TextBox"
                     name="writesomething"
                     data-dojo-props="label: 'Write something'"
                     value = "value1"
              />
              <input data-dojo-type="havok/form/TextBox"
                     name="somethingelse"
                     data-dojo-props="label: 'Something else'"
                     value = "value2"
              />
          </div>
       </div>
    </div>

</section>
