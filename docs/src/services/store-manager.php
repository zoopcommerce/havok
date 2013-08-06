
        <section id="store-manager" title="Store Manager">
          <div class="page-header">
            <h1>Store Manager</h1>
          </div>

          <p class="lead">Container for managing data stores</p>

          <p>The store manager allows you to configure the data stores you want to use with di, and then retrieve whole stores and individual records simply.</p>

          <h2>Config</h2>

          <p>To configure the store manager use di, and populate the stores array. Each store should have a <code>name</code> property set. Eg:</p>

<pre class="prettyprint linenums">
di: {
    'havok/store/manager': {
        gets: {
            stores: [
                {
                    base: 'my/store/one',
                    params: {name: 'store1'}
                },
                {
                    base: 'my/store/two',
                    params: {name: 'store2'}
                }
            ]
        },
        proxies: {
            stores: [
                {
                    base: 'my/store/three',
                    params: {name: 'store3'}
                }
            ]
        }
    }
}
</pre>

          <h2>Retrieve a store</h2>

          <p>To get a store, use <code>getStore</code>. Note that a Deferred may be returned if the individual store is proxied.</p>

<pre class="prettyprint linenums">
require(['havok/store/manager'], function(storeManager){
    var store1 = storeManager.getStore('store1');
}
</pre>

          <h2>Retrieve a record</h2>

          <p>To get a single record from a store, use <code>get</code> and pass a reference with the store name and record id. Eg:</p>

<pre class="prettyprint linenums">
require(['havok/store/manager'], function(storeManager){
    var record = storeManager.get('store1/id1');
}
</pre>
          <h2>Support</h2>

          <p>The store manager is supported by many havok that can use data stores.</p>
 
        </section>
