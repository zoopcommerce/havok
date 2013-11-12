
        <section id="textarea" title="Textarea">
          <div class="page-header">
            <h1>Textarea</h1>
          </div>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <textarea data-dojo-type="havok/form/Textarea" data-dojo-props="label:'About'">
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </textarea>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;textarea data-dojo-type=&quot;havok/form/Textarea&quot; data-dojo-props=&quot;label:'About'&quot;&gt;
    Lorem ipsum dolor ...
&lt;/textarea&gt;
</pre>


          <h2>Rows Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <div data-dojo-type="havok/form/Textarea">
                    <label>About</label>
                    <textarea placeholder="please enter some text here" rows="15"></textarea>
                </div>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;div data-dojo-type=&quot;havok/form/Textarea&quot;&gt;
    &lt;label&gt;About&lt;/label&gt;
    &lt;textarea placeholder=&quot;please enter some text here&quot; rows=&quot;15&quot;&gt;&lt;/textarea&gt;
&lt;/div&gt;
</pre>

          <h2>Filter Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <textarea data-dojo-type="havok/form/Textarea" rows="15" data-dojo-props="label:'About', filter: ['Trim', 'Uppercase']">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </textarea>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;textarea
    data-dojo-type=&quot;havok/form/Textarea&quot; rows=&quot;15&quot;
    data-dojo-props=&quot;label:'About', filter: ['Trim', 'Uppercase']&quot;
&gt;
    Lorem ipsum dolor ...
&lt;/textarea&gt;
</pre>

          <h2>Validation text area</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <textarea data-dojo-type="havok/form/ValidationTextarea" data-dojo-props="label:'About', validator: {base: 'Length', params: {min: 10, max: 50}}">
                Too long. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                </textarea>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;textarea
    data-dojo-type=&quot;havok/form/ValidationTextarea&quot;
    data-dojo-props=&quot;label:'About', validator: {base: 'Length', params: {min: 10, max: 50}}&quot;
&gt;
    Too long. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
&lt;/textarea&gt;
</pre>

          <h2>Expanding text area</h2>

          <p>Mixin <code>dijit/form/_ExpandingTextAreaMixin</code> to make a text area expand to match the length of it's content.</p>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <textarea
                    data-dojo-type="havok/form/Textarea"
                    data-dojo-mixins="dijit/form/_ExpandingTextAreaMixin"
                    data-dojo-props="label:'About', helpMessages: 'this will expand to fit'">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </textarea>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;textarea
    data-dojo-type=&quot;havok/form/Textarea&quot;
    data-dojo-mixins=&quot;dijit/form/_ExpandingTextAreaMixin&quot;
    data-dojo-props=&quot;label:'About'&quot;
&gt;
    Lorem ipsum dolor ...
&lt;/textarea&gt;
</pre>

        </section>
