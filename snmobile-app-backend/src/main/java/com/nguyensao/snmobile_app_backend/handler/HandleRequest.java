package com.nguyensao.snmobile_app_backend.handler;

import org.springframework.web.socket.WebSocketSession;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HandleRequest {
    private WebSocketSession session;
    private String time;
}
