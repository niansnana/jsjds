<?php

namespace App\Providers;

use App\Models\Article_class;
use Illuminate\Support\ServiceProvider;
use App\Models\Config;
use Illuminate\Support\Facades\DB;

class MulitiViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // 多视图数据共享
        $menus = Article_class::where('show_in_nav','=','1')->orderBy('id','asc')->get();
        view()->share(compact('menus'));

        view()->composer(['layout.*','index','article_list','article_show'],function ($view){
            $config = DB::table('config')->where('id',1)->first();
            $view->with('site_name',$config->site_name)
                ->with('site_url',$config->site_url)
                ->with('avatar',$config->avatar)
                ->with('site_keywords',$config->site_keywords)
                ->with('site_description',$config->site_description)
                ->with('site_copy',$config->site_copy)
                ->with('site_record',$config->site_record)
                ->with('company_name',$config->company_name)
                ->with('company_address',$config->company_address)
                ->with('company_fax',$config->company_fax)
                ->with('company_phone',$config->company_phone)
                ->with('company_email',$config->company_email)
                ->with('company_contact',$config->company_contact)
                ->with('company_skill',$config->company_skill)
                ->with('created_at',$config->created_at)
                ->with('updated_at',$config->updated_at)
            ;
        });
    }
}
