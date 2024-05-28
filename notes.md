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