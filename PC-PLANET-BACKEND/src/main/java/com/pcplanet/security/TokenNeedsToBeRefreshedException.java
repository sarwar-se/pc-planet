package com.pcplanet.security;

public class TokenNeedsToBeRefreshedException extends Exception {
    public TokenNeedsToBeRefreshedException() {
        super("Access token is expired! Consider refreshing.");
    }
}
