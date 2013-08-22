
        <section id="check-and-radio" title="Check and Radio">
          <div class="page-header">
            <h1>Check and Radio</h1>
          </div>

            <h2>Checkbox</h2>
            <p><code>havok/form/Checkbox</code> provides nicely styled checkbox.</p>

          <h3>Example</h3>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/Checkbox"
                    data-dojo-props="
                        label:'Check Me',
                        helpMessages: 'this is a checkbox',
                        value: true
                    "
                 />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/Checkbox&quot;
    data-dojo-props=&quot;
        label:'Check Me',
        helpMessages: 'this is a checkbox',
        value: true
    &quot;
 /&gt;
</pre>

          <h3>Button style</h3>

          <p>Use <code>havok/form/ToggleButton</code> for a button style checkbox.</p>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ToggleButton"
                    data-dojo-props="
                        text:'Check Me',
                        label: 'A checkbox',
                        helpMessages: 'this is a button checkbox',
                        value: true
                    "
                 />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ToggleButton&quot;
    data-dojo-props=&quot;
        text:'Check Me',
        label: 'A checkbox',
        helpMessages: 'this is a button checkbox',
        value: true
    &quot;
 /&gt;
</pre>

          <h3>Grouped Button style</h3>

          <p>Use <code>havok/form/CheckboxGroup</code> for a group of button style checkboxes.</p>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/CheckboxGroup"
                    data-dojo-props="
                        label: 'A checkbox group',
                        helpMessages: 'this is a checkbox group',
                        value: {l: true, m: false, r: true},
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
&lt;input data-dojo-type=&quot;havok/form/CheckboxGroup&quot;
    data-dojo-props=&quot;
        label: 'A checkbox group',
        helpMessages: 'this is a checkbox group',
        value: {l: true, m: false, r: true},
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

          <h2>Radio Group</h2>

          <h3>Grouped Button style</h3>

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
