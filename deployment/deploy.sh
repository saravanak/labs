# Run from the root dir 

set -xe
# ./deployment/build-blog-resume.sh
cd deployment 
ansible-playbook -vv deploy.yml -i hosts.yml \
    --private-key ~/.ssh/digital_ocean
