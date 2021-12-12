interface Statuses {
  statuses: 'up' | 'maintenance' | 'validating' | 'down' | 'paused' | 'pending';
}

interface Status {
  data: {
    id: string;
    type: string;
    attributes: {
      url: string;
      pronounceable_name: string;
      monitor_type: string;
      monitor_group_id?: string;
      last_checked_at: string;
      status: Statuses['statuses'];
      policy_id?: string;
      required_keyword?: string;
      verify_ssl: boolean;
      check_frequency: number;
      call: boolean;
      sms: boolean;
      email: boolean;
      push: boolean;
      team_wait: boolean;
      http_method: 'get' | 'post';
      request_timeout: number;
      recovery_period: number;
      request_headers: string[];
      request_body: string;
      follow_redirects: boolean;
      remember_cookies: boolean;
      paused_at?: string;
      created_at: string;
      updated_at: string;
      ssl_expiration: string;
      domain_expiration: string;
      regions: string[];
      port: number;
      confirmation_period: number;
    };
    relationships: {
      policy: {
        data: string;
      };
    };
  };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AZURE_VISION_KEY: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
