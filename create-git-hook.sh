#!/bin/sh

# If a command fails then the deploy stops
set -e

baseDir=`pwd`
filename="$baseDir/.git/hooks/pre-commit"
rm -rf $filename
printf "\033[0;32mCreate git hooks for pre-commit changes an create docs folder for updates to GitHub...\033[0m\n"
printf "$filename"
{
        echo "#!/bin/bash"
        echo "ROOT_REPO=$baseDir"
        echo 'hugo -s $ROOT_REPO'
        echo 'git add $ROOT_REPO'
} >> $filename
# Set execution permission to file
chmod +x $filename