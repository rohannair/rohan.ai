let pkgs = import <nixpkgs> {};

in pkgs.mkShell rec {
  name = "rohan.ai";

  buildInputs = with pkgs; [
    gnumake
    gcc
    readline
    openssl
    libxml2
    curl
    libiconv
    glibcLocales
    jq
    bat
    exa
    git
    nodejs-18_x
    yarn
  ];

  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
    alias scripts='jq ".scripts" package.json'
    alias c=bat
    alias g=git
    alias ls=exa
  '';
}