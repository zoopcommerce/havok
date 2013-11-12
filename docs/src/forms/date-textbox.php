
        <section id="date-textbox" title="Date Textbox">
          <div class="page-header">
            <h1>Date Textbox</h1>
          </div>

          <p><code>havok/form/DateTextbox</code> extends <code>havok/form/ValidationTextbox</code> to give date picking ability.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/DateTextBox"
                    data-dojo-props="
                        label:'Date',
                        helpMessages: 'pick a date'
                    "
                />
             </div>
          </div>

<pre class="prettyprint linenums">

</pre>

          <h2>Example with preset value</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/DateTextBox"
                    data-dojo-props="
                        label:'Date',
                        helpMessages: 'pick a date',
                        value: new Date(2020, 1, 1)
                    "
                />
             </div>
          </div>

<pre class="prettyprint linenums">

</pre>

        </section>
