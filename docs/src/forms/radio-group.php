
        <section id="radio-group" title="Radio Group">
          <div class="page-header">
            <h1>Radio Group</h1>
          </div>


          <h2>Grouped Button style</h2>

          <p>Use <code>havok/form/RadioGroup</code> for a group of button style radios.</p>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/RadioGroup"
                    data-dojo-props="
                        label: 'A radio group',
                        helpMessages: 'this is a radio group',
                        value: 'm',
                        store: {
                            data: [
                                {id: 'l', type: 'button', text: 'left'},
                                {id: 'm', type: 'button', text: 'middle'},
                                {id: 'r', type: 'button', text: 'right'}
                            ]
                        }
                    "
                 />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/RadioGroup&quot;
    data-dojo-props=&quot;
        label: 'A radio group',
        helpMessages: 'this is a radio group',
        value: 'm',
        store: {
            data: [
                {id: 'l', type: 'button', text: 'left'},
                {id: 'm', type: 'button', text: 'middle'},
                {id: 'r', type: 'button', text: 'right'}
            ]
        }
    &quot;
 /&gt;
</pre>

        </section>
