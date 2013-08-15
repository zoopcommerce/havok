
        <section id="texteditor" title="Texteditor">
          <div class="page-header">
            <h1>Texteditor</h1>
          </div>

            <p>Add rich text editing with <code>havok/form/TextEditor</code>. Also supports filters and validators.</p>
          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havokdocs/Formspy" class="form-horizontal">
                <div data-dojo-type="havok/form/TextEditor"
                     data-dojo-props="label:'My Story', helpMessages: 'here is some text to edit', validator: 'Required'">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/TextEditor&quot;
     data-dojo-props=&quot;
     label:'My Story',
     helpMessages: 'here is some text to edit',
     validator: 'Required'&quot;
&gt;
    Lorem ipsum ...
&lt;/div&gt;
</pre>

        </section>
