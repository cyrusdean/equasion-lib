# Equasion Lib

To Develop:

Run `npm link` in equasion-lib repo. In the repository you want to use equasion-lib, run `npm link equasion-lib`.

To unlink run `npm unlink .` anywhere to remove all global symlinks. Run `npm unlink` on the module's directory to remove the global symlink and run `npm unlink --no-save equasion-lib` on the project's directory to remove the local symlink.

OR

```
"file:../your-repository/node_modules/formik",
"react": "file:../your-repository/node_modules/react",
"react-dom": "file:../your-repository/node_modules/react-dom",
```

in package JSON of equasion-lib with:

```
"optionalDependencies": {
    "equasion-lib": "file:../equasion-lib"
},
```

in your repository package.json
