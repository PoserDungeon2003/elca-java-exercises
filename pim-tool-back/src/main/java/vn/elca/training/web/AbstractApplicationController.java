package vn.elca.training.web;

import org.apache.catalina.core.ApplicationMapping;
import org.springframework.beans.factory.annotation.Autowired;
import vn.elca.training.util.ApplicationMapper;

public abstract class AbstractApplicationController {
    @Autowired
    ApplicationMapper mapper;
}
