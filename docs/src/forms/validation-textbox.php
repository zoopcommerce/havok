
        <section id="validation-textbox" title="Validation Textbox">
          <div class="page-header">
            <h1>Validation Textbox</h1>
          </div>

            <p><code>havok/form/ValidationTextbox</code> extends <code>havok/form/Textbox</code> to add validation ability.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="validator: 'Alpha'"
                       value = "asdf123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;validator: 'Alpha'&quot;
       value = &quot;asdf123&quot;
/&gt;
</pre>

          <h2>Specifying the Validator</h2>

          <p>Havok uses the <a href="http://zoopcommerce.github.io/mystique">mystique</a> validator library. And, <code>havok/validator/factory</code> to create validator instances. The validator property will be passed to the validator factory to construct a validator.</p>

          <h3>Create a validator with constructor options:</h3>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="validator: {base: 'Length', params: {min: 5, max: 10}}"
                       value = "123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;validator: {base: 'Length', params: {min: 5, max: 10}}&quot;
       value = &quot;123&quot;
/&gt;
</pre>


          <h3>Create a validator chain:</h3>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="validator: [
                           'Alpha',
                           {base: 'Length', params: {min: 5, max: 10}}
                       ]"
                       value = "123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;validator: [
           'Alpha',
           {base: 'Length', params: {min: 5, max: 10}}
       ]&quot;
       value = &quot;123&quot;
/&gt;
</pre>

          <h2>validationStyle</h2>
          <p>By default, validation errors are only highlighted after user interaction with the input. These styles be customised using the validationStyle property. It holds four lists of css class names that will be applied the four different validation situations.</p>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="
                           validator: 'Alpha',
                           validationStyle: {
                               preActivity: {
                                   valid: ['info'],
                                   invalid: ['warning']
                               },
                               postActivity: {
                                   valid: ['info'],
                                   invalid: ['error']
                               }
                           }
                       "
                       value = "asdf123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;
           validator: 'Alpha',
           validationStyle: {
               preActivity: {
                   valid: ['info'],
                   invalid: ['warning']
               },
               postActivity: {
                   valid: ['info'],
                   invalid: ['error']
               }
           }
       &quot;
       value = &quot;asdf123&quot;
/&gt;
</pre>

          <h2>postActivity</h2>
          <p>To force the postActivity style to be applied, set the <code>postActivity</code> flag to true.</p>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="
                           validator: 'Alpha',
                           postActivity: true
                       "
                       value = "asdf123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;
           validator: 'Alpha',
           postActivity: true
       &quot;
       value = &quot;asdf123&quot;
/&gt;
</pre>

          <h2>delay</h2>
          <p>To stop validation occuring on every single keystroke, there is a validation delay. It is set to 350ms by default. The example below has very slow validation with delay set to 2000ms:</p>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="
                           validator: 'Alpha',
                           delay: 2000
                       "
                       value = "asdf123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;
           validator: 'Alpha',
           delay: 2000
       &quot;
       value = &quot;asdf123&quot;
/&gt;
</pre>

          <h2>suppressValidation</h2>
          <p>The <code>suppressValidation</code> flag will stop all validation. It will not change the <code>state</code> of the textbox.</p>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="
                           validator: 'Alpha',
                           suppressValidation: true
                       "
                       value = "asdf123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;
           validator: 'Alpha',
           suppressValidation: true
       &quot;
       value = &quot;asdf123&quot;
/&gt;
</pre>

          <h2>suppressValidationMessages</h2>
          <p>The <code>suppressValidationMessages</code> flag will allow validation to continue, but will not show validation messages. Message suppression can be set for pre and post activity. Messages are suppressed pre activity by default.</p>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="
                           validator: 'Alpha',
                           suppressValidationMessages: {
                               preActivity: false,
                               postActivity: true
                           }
                       "
                       value = "asdf123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;
           validator: 'Alpha',
           suppressValidationMessages: {
               preActivity: false,
               postActivity: true
           }
       &quot;
       value = &quot;asdf123&quot;
/&gt;
</pre>

          <h2>required star</h2>
          <p>If the validator is <code>mystique/Required</code> or a chain containing <code>mystique/Required</code> the required star will be visible by default.</p>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/ValidationTextBox"
                       data-dojo-props="
                           validator: 'Required'
                       "
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ValidationTextBox&quot;
       data-dojo-props=&quot;
           validator: 'Required'
       &quot;
/&gt;
</pre>

        </section>
