`pacman -Qil gnucash`

/usr/lib/libgnc-engine.so
/usr/include/gnucash/

## Locating the libs 
    
### Header files 

  /usr/include/gnucash/Account.h 
    
    has gnc_account_get_full_name

### From documentation
    https://wiki.gnucash.org/wiki/Using_the_API 
    https://code.gnucash.org/docs/STABLE/group__Account.html#ga0a1d66898cc2bdce82000e08bad9b374

### Inspecting the library file 

`    nm -gD /usr/lib/libgnc-engine.so ` contains

000000000012f3a0 T gnc_account_get_full_name; 
so the symbol is in the text (code) section


Also `objdump -TC /usr/lib/libgnc-engine.so` 


### Generating uuid as an example using libuuid

```
sudo pacman -S util-linux-libs
sudo pacman -Qil util-linux-libs 
# Wrote uuid.c
gcc   -L/usr/lib -I/usr/lib -luuid uuid.c
./a.out
# voila
```

### Gnucash and SWIG 

There are lot of SWIG interface files in gnucash. This is needed by GnuCash for Guile (reports) and python bindings. 
Was able to generate the go wrappers using the python interface files like so: 

```
  swig -go -I ../common/ core-utils.i
  swig -go -I../common/ core-utils.i
  swig -go -I../common/ -I../libgnucash/core-utils core-utils.i
  swig -go -I../common/ -I../libgnucash/core-utils app-utils.i
  swig -go -I../common/ -I../libgnucash/core-utils business-core.i  
  swig -go -I../common/ -I../libgnucash/core-utils -I../libgnucash/engine business-core.i
  swig -go -I../common/ -I../libgnucash/core-utils -I../libgnucash/engine engine.i
  swig -go -I../common/ -I../libgnucash/core-utils -I../libgnucash/engine -I../bindings/guile engine.i
  swig -go -I../common/ -I../libgnucash/core-utils -I../libgnucash/engine -I../bindings/guile expressions.i
  swig -go -I../../common/ -I../../libgnucash/core-utils -I../../libgnucash/engine -I../../bindings/guile gnucash_core.i
  swig -go -I../../common/ -I../../libgnucash/core-utils -I../../libgnucash/engine -I../../bindings/guile -I../ gnucash_core.i  
  swig -go -cgo -I../../common/ -I../../libgnucash/core-utils -I../../libgnucash/engine -I../../bindings/guile -I../ gnucash_core.i
```

But did not explore aftrer this as this looked more complex. But looks like libgnucash has all the central logic and the UI aspects are well seperated from the libs. 

### Backends for GnuCash 

This turned out to be a duh moment. Had to install the necessary database interface libs to enable the save-as on GnuCash to expose sqlite and postgres. Was able to use this and save the transactions as an sqlite db. 

Using this and 
 - pie-cash we can generate some simple exploratory UIs on the DB. 
 - Datasette can be used. Plugins/ etc can be used to build a system quickly. Eg charting etc. 
 - Using custom made queries, plus CTEs we can build a frontend in things we like.
 - unified DSL language for querying across all these formats
 - [ ] Write filtering typeahead for account names.