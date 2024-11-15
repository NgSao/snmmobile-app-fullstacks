package com.nguyensao.snmobile_app_backend.handler;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
public class MyHandler extends TextWebSocketHandler {

    @Getter
    private final List<HandleRequest> list = new ArrayList<>();

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws IOException {
        String currentTime = getCurrentTime();

        list.add(new HandleRequest(session, currentTime));

    }

    private String getCurrentTime() {
        // Format the current time as a string
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(new Date());
    }

    public void sendManualReply(String reply) {
        // Iterate over the list of SessionData
        for (HandleRequest sessionData : list) {
            try {
                // Send the reply message to the session
                sessionData.getSession().sendMessage(new TextMessage(reply));
            } catch (IOException e) {
                log.error("Error sending manual reply: ", e);
            }
        }
    }
}
