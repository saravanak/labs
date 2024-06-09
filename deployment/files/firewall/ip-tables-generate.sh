iptables -F INPUT

while read -r  ip_range
do
    if ! iptables -C INPUT  -s $ip_range -p tcp --dport 80 -j ACCEPT; then
        iptables -A INPUT  -s $ip_range -p tcp --dport 80 -j ACCEPT
    fi 
done < cloudflare-ip-lists.txt

# Accept loopback
iptables -A INPUT  -p tcp --dport 80 -j REJECT -m comment --comment "Reject all other port 80 requests"


