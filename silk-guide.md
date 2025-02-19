Use the silk interface stylesheet

Use it like:
```html
<style>
  @import url(https://silk-a-i.github.io/interface/index.css);

  /* ...custom app styles */
</style>
```

Here an example of the available styling:
```html
<div class="container">
    <h2>Components Showcase</h2>
    <s-card>
        <s-panel title="Form Details" open>
            <form>
                <input type="text" placeholder="Username">
                <input type="password" placeholder="Password">
                <button>Login</button>
            </form>
        </s-panel>

        <s-panel title="Buttons">
            <s-row>
                <button color="primary">Primary</button>
                <button variant="outlined">outlined</button>
                <button block>block</button>
            </s-row>
        </s-panel>

        <s-panel title="Icons">
            <button><s-icon>✨</s-icon> Get started</button>
        </s-panel>
    </s-card>

    <footer>silk interface vfeb25</footer>
</div>
```
  