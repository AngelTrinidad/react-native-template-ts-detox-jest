#!/usr/bin/env bash

APP_NAME=MyApp
REPO_PATH=`pwd`
TEMPLATE="file://$REPO_PATH"

echo "Moving up a directory"
cd ..

echo "Initializing test project $APP_NAME using template at $TEMPLATE"
react-native init $APP_NAME --template $TEMPLATE >/dev/null 2>/dev/null
INIT_PROJECT=$?
if [ $INIT_PROJECT == 0 ]; then
    echo "Initialization succeeded; executing post-install step"
    node $APP_NAME/postInstall.js
else
    echo "Initialization failed; skipping post-install step"
    false
fi
POST_INSTALL=$?

let "STATUS=$INIT_PROJECT+$POST_INSTALL"
if [ $STATUS == 0 ]; then
    echo "Passed test!"
else
    echo "FAILED TEST"
fi

if [ -d "$APP_NAME" ]; then
    echo "Removing test project"
    rm -rf $APP_NAME
fi

echo "Moving back to previous location"
cd $PREVIOUS_LOCATION

if [ $STATUS -eq 0 ]; then
    true
else
    false
fi